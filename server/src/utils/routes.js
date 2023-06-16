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
    createChild: {
      url: () => '/child',
      method: methods.POST,
      validate: (url, method) => (
        url === routes.child.createChild.url() &&
        method === routes.child.createChild.method
      )
    },
  
    updateChild: {
      url: (id) => `/child?id=${id}`,
      method: methods.PATCH,
      validate: (url, method, id) => (
        url === routes.child.updateChild.url(id) &&
        method === routes.child.updateChild.method
      )
    },
  
    deleteChild: {
      url: (childId) => `/child?id=${childId}`,
      method: methods.DELETE,
      validate: (url, method, childId) => (
        url === routes.child.deleteChild.url(childId) &&
        method === routes.child.deleteChild.method
      )
    },
  
    getChildById: {
      url: (childId) => `/child?id=${childId}`,
      method: methods.GET,
      validate: (url, method, childId) => (
        url === routes.child.getChildById.url(childId) &&
        method === routes.child.getChildById.method
      )
    },
  
    getChildrenByFamilyId: {
      url: (familyId) => `/child?familyId=${familyId}`,
      method: methods.GET,
      validate: (url, method, familyId) => (
        url === routes.child.getChildrenByFamilyId.url(familyId) &&
        method === routes.child.getChildrenByFamilyId.method
      )
    },
  
    getChildren: {
      url: () => "/child/all",
      method: methods.GET,
      validate: (url, method) => (
        url === routes.child.getChildren.url() &&
        method === routes.child.getChildren.method
      )
    },
  },

  friend: {
    createFriend: {
      url: () => '/friends',
      method: methods.POST,
      validate: (url, method) => (
        url === routes.friend.createFriend.url() &&
        method === routes.friend.createFriend.method
      )
    },
  
    updateFriend: {
      url: (friendId) => `/friends?id=${friendId}`,
      method: methods.PATCH,
      validate: (url, method, friendId) => (
        url === routes.friend.updateFriend.url(friendId) &&
        method === routes.friend.updateFriend.method
      )
    },
  
    deleteFriend: {
      url: (friendId) => `/friends?id=${friendId}`,
      method: methods.DELETE,
      validate: (url, method, friendId) => (
        url === routes.friend.deleteFriend.url(friendId) &&
        method === routes.friend.deleteFriend.method
      )
    },
  
    getFriendById: {
      url: (friendId) => `/friends?id=${friendId}`,
      method: methods.GET,
      validate: (url, method, friendId) => (
        url === routes.friend.getFriendById.url(friendId) &&
        method === routes.friend.getFriendById.method
      )
    },
  
    getFriends: {
      url: (childId) => `/friends?childId=${childId}`,
      method: methods.GET,
      validate: (url, method, childId) => (
        url === routes.friend.getFriends.url(childId) &&
        method === routes.friend.getFriends.method
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
  }
}

module.exports = {
  methods,
  routes,
  getQueryString
}