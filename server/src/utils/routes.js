const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS"
}

const getQueryString = (string) => string.substring(string.indexOf('?') + 1);

const routes = {
  createChild: {
    url: () => '/child',
    method: methods.POST,
    validate: (url, method) => (
      url === routes.createChild.url() &&
      method === routes.createChild.method
    )
  },

  updateChild: {
    url: () => '/child',
    method: methods.PATCH,
    validate: (url, method) => (
      url === routes.updateChild.url() &&
      method === routes.updateChild.method
    )
  },

  deleteChild: {
    url: (childId) => `/child?id=${childId}`,
    method: methods.DELETE,
    validate: (url, method, childId) => (
      url === routes.deleteChild.url(childId) &&
      method === routes.deleteChild.method
    )
  },

  getChildById: {
    url: (childId) => `/child?id=${childId}`,
    method: methods.GET,
    validate: (url, method, childId) => (
      url === routes.getChildById.url(childId) &&
      method === routes.getChildById.method
    )
  },

  getChildrenByFamilyId: {
    url: (familyId) => `/child?familyId=${familyId}`,
    method: methods.GET,
    validate: (url, method, familyId) => (
      url === routes.getChildrenByFamilyId.url(familyId) &&
      method === routes.getChildrenByFamilyId.method
    )
  },

  getChildren: {
    url: () => "/child/all",
    method: methods.GET,
    validate: (url, method) => (
      url === routes.getChildren.url() &&
      method === routes.getChildren.method
    )
  },
}

module.exports = {
  methods,
  routes,
  getQueryString
}