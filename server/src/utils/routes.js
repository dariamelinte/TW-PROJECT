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

    getById_RSS: {
      url: (childId) => `/child?id=${childId}&rss=true`,
      method: methods.GET,
      validate: (url, method, childId) => (
        url === routes.child.getById_RSS.url(childId) &&
        method === routes.child.getById_RSS.method
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

    getByFamilyId_RSS: {
      url: (familyId) => `/child?familyId=${familyId}&rss=true`,
      method: methods.GET,
      validate: (url, method, familyId) => (
        url === routes.child.getByFamilyId_RSS.url(familyId) &&
        method === routes.child.getByFamilyId_RSS.method
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

    getAll_RSS: {
      url: () => "/child/all?rss=true",
      method: methods.GET,
      validate: (url, method) => (
        url === routes.child.getAll_RSS.url() &&
        method === routes.child.getAll_RSS.method
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

    getById_RSS: {
      url: (friendId) => `/friends?id=${friendId}&rss=true`,
      method: methods.GET,
      validate: (url, method, friendId) => (
        url === routes.friend.getById_RSS.url(friendId) &&
        method === routes.friend.getById_RSS.method
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

    getAll_RSS: {
      url: (childId) => `/friends?childId=${childId}&rss=true`,
      method: methods.GET,
      validate: (url, method, childId) => (
        url === routes.friend.getAll_RSS.url(childId) &&
        method === routes.friend.getAll_RSS.method
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

    getById_RSS: {
      url: (id) => `/friend-interactions?id=${id}&rss=true`,
      method: methods.GET,
      validate: (url, method, id) => (
        url === routes.friendInteraction.getById_RSS.url(id) &&
        method === routes.friendInteraction.getById_RSS.method
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

    getByChildId_RSS: {
      url: (childId, friendId) => `/friend-interactions?childId=${childId}&friendId=${friendId}&rss=true`,
      method: methods.GET,
      validate: (url, method, childId, friendId) => (
        url === routes.friendInteraction.getByChildId_RSS.url(childId, friendId) &&
        method === routes.friendInteraction.getByChildId_RSS.method
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
    },
    
    logout: {
      url: () => '/auth/logout',
      method: methods.POST,
      validate: (url, method) => (
        url === routes.auth.logout.url() &&
        method === routes.auth.logout.method
      )
    },

    changePassword: {
      url: (id) => `/auth/change-password?id=${id}`,
      method: methods.POST,
      validate: (url, method, id) => (
        url === routes.auth.changePassword.url(id) &&
        method === routes.auth.changePassword.method
      )
    },
  },

  user: {
    create: {
      url: () => '/users',
      method: methods.POST,
      validate: (url, method) => (
        url === routes.user.create.url() &&
        method === routes.user.create.method
      )
    },
  
    update: {
      url: (id) => `/users?id=${id}`,
      method: methods.PATCH,
      validate: (url, method, id) => (
        url === routes.user.update.url(id) &&
        method === routes.user.update.method
      )
    },
  
    delete: {
      url: (id) => `/users?id=${id}`,
      method: methods.DELETE,
      validate: (url, method, id) => (
        url === routes.user.delete.url(id) &&
        method === routes.user.delete.method
      )
    },
  
    getById: {
      url: (id) => `/users?id=${id}`,
      method: methods.GET,
      validate: (url, method, id) => (
        url === routes.user.getById.url(id) &&
        method === routes.user.getById.method
      )
    },
  
    getByFamilyId: {
      url: (id) => `/users?familyId=${id}`,
      method: methods.GET,
      validate: (url, method, id) => (
        url === routes.user.getByFamilyId.url(id) &&
        method === routes.user.getByFamilyId.method
      )
    },
  
    getByEmail: {
      url: (email) => `/users?email=${email}`,
      method: methods.GET,
      validate: (url, method, email) => (
        url === routes.user.getByEmail.url(email) &&
        method === routes.user.getByEmail.method
      )
    },
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
  },

  medical: {
    create: {
      url: () => '/medical-events',
      method: methods.POST,
      validate: (url, method) => (
        url === routes.medical.create.url() &&
        method === routes.medical.create.method
      )
    },
  
    update: {
      url: (id) => `/medical-events?id=${id}`,
      method: methods.PATCH,
      validate: (url, method, id) => (
        url === routes.medical.update.url(id) &&
        method === routes.medical.update.method
      )
    },
  
    delete: {
      url: (id) => `/medical-events?id=${id}`,
      method: methods.DELETE,
      validate: (url, method, id) => (
        url === routes.medical.delete.url(id) &&
        method === routes.medical.delete.method
      )
    },
  
    getById: {
      url: (id) => `/medical-events?id=${id}`,
      method: methods.GET,
      validate: (url, method, id) => (
        url === routes.medical.getById.url(id) &&
        method === routes.medical.getById.method
      )
    },
  
    getByChildId: {
      url: (childId) => `/medical-events?childId=${childId}`,
      method: methods.GET,
      validate: (url, method, childId) => (
        url === routes.medical.getByChildId.url(childId) &&
        method === routes.medical.getByChildId.method
      )
    },
  },
}

module.exports = {
  methods,
  routes,
  getQueryString
}