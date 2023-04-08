export default class Routes {
  static root = '/frontend/pages';
  
  static home = {
    path: () => Routes.root + '/',
    title: 'Acasă'
  }

  static login = {
    path: () => Routes.root + '/login',
    title: 'Logare'
  }
  
  static register = {
    path: () => Routes.root + '/register',
    title: 'Înregistrare'
  }
  
  static forgotPassword = {
    path: () => Routes.root + '/forgot-password',
    title: 'Recuperare parolă'
  }
  
  static myAccount = {
    path: () => Routes.root + '/my-account',
    title: 'Contul meu'
  }
  
  static child = {
    path: (childId) => Routes.root + `?childId=${childId}`,
    title: 'Copil'
  }

  static addChild = {
    path: () => Routes.root + `/add-child`,
    title: 'Adauga Copil'
  }

  static children = {
    personalInfo: {
      path: (childId) => Routes.root + `/child/personal-info/?childId=${childId}`,
      title: 'Informații personale'
    },
    feedingCalendar: {
      path: (childId) => Routes.root + `/child/feeding-calendar/?childId=${childId}`,
      title: 'Calendarul hrănirii',
      card: {
        path: (childId, cardId) => Routes.root + `/child/feeding-calendar/card/?childId=${childId}&cardId=${cardId}`,
        title: 'Card'
      }
    },
    sleepingCalendar: {
      path: (childId) => Routes.root + `/child/sleeping-calendar/?childId=${childId}`,
      title: 'Calendarul somnului',
      card: {
        path: (childId, cardId) => Routes.root + `/child/sleeping-calendar/card/?childId=${childId}&cardId=${cardId}`,
        title: 'Card'
      }
    },
    multimediaResources: {
      path: (childId) => Routes.root + `/child/multimedia-resources/?childId=${childId}`,
      title: 'Resurse multimedia',
      resource: {
        path: (childId, resourceId) => Routes.root + `/child/multimedia-resources/resource/?childId=${childId}&resourceId=${resourceId}`,
        title: 'Resursă'
      }
    },
    medicalHistory: {
      path: (childId) => Routes.root + `/child/medical-history/?childId=${childId}`,
      title: 'Istoric medical',
      card: {
        path: (childId, cardId) => Routes.root + `/child/medical-history/card/?childId=${childId}&cardId=${cardId}`,
        title: 'Card'
      }
    },
    friendships: {
      path: (childId) => Routes.root + `/child/friendships/?childId=${childId}`,
      title: 'Relații de prietenie',
      friend: {
        path: (childId, friendId) => Routes.root + `/child/friendships/friend/?childId=${childId}&friendId=${friendId}`,
        title: 'Prieten',
        card: {
          path: (childId, friendId, cardId) => Routes.root + `/child/friendships/friend/card/?childId=${childId}&friendId=${friendId}&cardId=${cardId}`,
          title: 'Card'
        }
      }
    }
  }
}