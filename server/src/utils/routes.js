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
  child: {
    create: {
      url: () => '/child',
      method: methods.POST,
      validate: (url, method) => (
        url === routes.child.create.url() &&
        method === routes.child.create.method
      )
    },
  
    update: {
      url: (id) => `/child?id=${id}`,
      method: methods.PATCH,
      validate: (url, method, id) => (
        url === routes.child.update.url(id) &&
        method === routes.child.update.method
      )
    },
  
    delete: {
      url: (childId) => `/child?id=${childId}`,
      method: methods.DELETE,
      validate: (url, method, childId) => (
        url === routes.child.delete.url(childId) &&
        method === routes.child.delete.method
      )
    },
  
    getById: {
      url: (childId) => `/child?id=${childId}`,
      method: methods.GET,
      validate: (url, method, childId) => (
        url === routes.child.getById.url(childId) &&
        method === routes.child.getById.method
      )
    },
  
    getByFamilyId: {
      url: (familyId) => `/child?familyId=${familyId}`,
      method: methods.GET,
      validate: (url, method, familyId) => (
        url === routes.child.getByFamilyId.url(familyId) &&
        method === routes.child.getByFamilyId.method
      )
    },
  
    getAll: {
      url: () => "/child/all",
      method: methods.GET,
      validate: (url, method) => (
        url === routes.child.getAll.url() &&
        method === routes.child.getAll.method
      )
    },
  },

  friend: {
    create: {
      url: () => '/friends',
      method: methods.POST,
      validate: (url, method) => (
        url === routes.friend.create.url() &&
        method === routes.friend.create.method
      )
    },
  
    update: {
      url: (friendId) => `/friends?id=${friendId}`,
      method: methods.PATCH,
      validate: (url, method, friendId) => (
        url === routes.friend.update.url(friendId) &&
        method === routes.friend.update.method
      )
    },
  
    delete: {
      url: (friendId) => `/friends?id=${friendId}`,
      method: methods.DELETE,
      validate: (url, method, friendId) => (
        url === routes.friend.delete.url(friendId) &&
        method === routes.friend.delete.method
      )
    },
  
    getById: {
      url: (friendId) => `/friends?id=${friendId}`,
      method: methods.GET,
      validate: (url, method, friendId) => (
        url === routes.friend.getById.url(friendId) &&
        method === routes.friend.getById.method
      )
    },
  
    getAll: {
      url: (childId) => `/friends?childId=${childId}`,
      method: methods.GET,
      validate: (url, method, childId) => (
        url === routes.friend.getAll.url(childId) &&
        method === routes.friend.getAll.method
      )
    },
  },

  friendInteraction: {
    create: {
      url: () => '/friend-interactions',
      method: methods.POST,
      validate: (url, method) => (
        url === routes.friendInteraction.create.url() &&
        method === routes.friendInteraction.create.method
      )
    },
  
    update: {
      url: (id) => `/friend-interactions?id=${id}`,
      method: methods.PATCH,
      validate: (url, method, id) => (
        url === routes.friendInteraction.update.url(id) &&
        method === routes.friendInteraction.update.method
      )
    },
  
    delete: {
      url: (id) => `/friend-interactions?id=${id}`,
      method: methods.DELETE,
      validate: (url, method, id) => (
        url === routes.friendInteraction.delete.url(id) &&
        method === routes.friendInteraction.delete.method
      )
    },
  
    getById: {
      url: (id) => `/friend-interactions?id=${id}`,
      method: methods.GET,
      validate: (url, method, id) => (
        url === routes.friendInteraction.getById.url(id) &&
        method === routes.friendInteraction.getById.method
      )
    },
  
    getByChildId: {
      url: (childId, friendId) => `/friend-interactions?childId=${childId}&friendId=${friendId}`,
      method: methods.GET,
      validate: (url, method, childId, friendId) => (
        url === routes.friendInteraction.getByChildId.url(childId, friendId) &&
        method === routes.friendInteraction.getByChildId.method
      )
    },
  },

  auth: {
    register: {
      url: () => '/auth/register',
      method: methods.POST,
      validate: (url, method) => (
        url === routes.auth.register.url() &&
        method === routes.auth.register.method
      )
    },

    login: {
      url: () => '/auth/login',
      method: methods.POST,
      validate: (url, method) => (
        url === routes.auth.login.url() &&
        method === routes.auth.login.method
      )
    },

    forgotPassword: {
      url: () => '/auth/forgot-password',
      method: methods.POST,
      validate: (url, method) => (
        url === routes.auth.forgotPassword.url() &&
        method === routes.auth.forgotPassword.method
      )
    }
  },

  feeding: {
    create: {
      url: () => `/feeding-calendar`,
      method: methods.POST,
      validate: (url, method) => (
        url === routes.feeding.create.url() &&
        method === routes.feeding.create.method
      )
    },

    update: {
      url: (id) => `/feeding-calendar?id=${id}`,
      method: methods.PATCH,
      validate: (url, method, id) => (
        url === routes.feeding.update.url(id) &&
        method === routes.feeding.update.method
      )
    },

    delete: {
      url: (id) => `/feeding-calendar?id=${id}`,
      method: methods.DELETE,
      validate: (url, method, id) => (
        url === routes.feeding.delete.url(id) &&
        method === routes.feeding.delete.method
      )
    },

    getAll: {
      url: (childId) => `/feeding-calendar?childId=${childId}`,
      method: methods.GET,
      validate: (url, method, childId) => (
        url === routes.feeding.getAll.url(childId) &&
        method === routes.feeding.getAll.method
      )
    },

    getById: {
      url: (id) => `/feeding-calendar?id=${id}`,
      method: methods.GET,
      validate: (url, method, id) => (
        url === routes.feeding.getById.url(id) &&
        method === routes.feeding.getById.method
      )
    },
  },

  sleeping: {
    create: {
      url: () => `/sleeping-calendar`,
      method: methods.POST,
      validate: (url, method) => (
        url === routes.sleeping.create.url() &&
        method === routes.sleeping.create.method
      )
    },

    update: {
      url: (id) => `/sleeping-calendar?id=${id}`,
      method: methods.PATCH,
      validate: (url, method, id) => (
        url === routes.sleeping.update.url(id) &&
        method === routes.sleeping.update.method
      )
    },

    delete: {
      url: (id) => `/sleeping-calendar?id=${id}`,
      method: methods.DELETE,
      validate: (url, method, id) => (
        url === routes.sleeping.delete.url(id) &&
        method === routes.sleeping.delete.method
      )
    },

    getAll: {
      url: (childId) => `/sleeping-calendar?childId=${childId}`,
      method: methods.GET,
      validate: (url, method, childId) => (
        url === routes.sleeping.getAll.url(childId) &&
        method === routes.sleeping.getAll.method
      )
    },

    getById: {
      url: (id) => `/sleeping-calendar?id=${id}`,
      method: methods.GET,
      validate: (url, method, id) => (
        url === routes.sleeping.getById.url(id) &&
        method === routes.sleeping.getById.method
      )
    },
  }
}

module.exports = {
  methods,
  routes,
  getQueryString
}