const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE"
}

const getQueryString = (string) => string.substring(string.indexOf('?') + 1);

const routes = {
  createChild: {
    url: () => '/child',
    method: methods.POST,
  },
  updateChild: {
    url: () => '/child',
    method: methods.PATCH
  },
  deleteChild: {
    url: (childId) => `/child?id=${childId}`,
    method: methods.DELETE
  },
  getChildById: {
    url: (childId) => `/child?id=${childId}`,
    method: methods.GET
  },
  getChildrenByFamilyId: {
    url: (familyId) => `/child?familyId=${familyId}`,
    method: methods.GET
  },
  getChildren: {
    url: () => "/children",
    method: methods.GET
  },

  isGetChildById: (url, method, childId) => {
    console.log(url === routes.getChildById.url(childId), method === routes.getChildById.method)
    return (
      url === routes.getChildById.url(childId) &&
      method === routes.getChildById.method
    )
  },
  isGetChildren: (url, method) => {
    return (
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