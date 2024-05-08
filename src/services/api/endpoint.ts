type ParamID = string | number;

export const BASE_PROXY = {
  social: '/api/social/v1',
  auth: '/api/auth/v1',
  searchEngine: '/api/search-engine/v1',
  notifications: '/api/notifications/v1',
  course: '/api/course/v1',
};

export const SEARCH_ENGINE_ENDPOINT = {
  GET: {
    spotlight: '/spotlight',
  },
};

export const SOCIAL_ENDPOINT = {
  GET: {
    profile: (employeeId: ParamID) =>
      `/social-employee/employee/${employeeId}/profile`,
  },
};

export const AUTH_ENDPOINT = {
  POST: {
    logout: '/auth/logout',
  },
};

export const NOTIFICATION_ENDPOINT = {
  GET: {
    notifications: '/notification',
    unreadCount: '/notification/other/unread',
    notificationModules: '/notification/other/modules',
  },
  PUT: {
    markAsRead: (notificationId: ParamID) =>
      `/notification/${notificationId}/read-mark`,
    allMarkAsRead: '/notification/other/all-read-mark',
    pinnedNotif: (notificationId: ParamID) =>
      `/notification/${notificationId}/pin`,
    putReads: '/notification/other/reads',
    aceptableActionNotif: (notificationId: ParamID) =>
      `/notification/${notificationId}/acceptance-status`,
  },
  DELETE: {
    deleteNotification: (notificationId: ParamID) =>
      `/notification/${notificationId}`,
  },
};

export const COURSE_ENDPOINT = {
  GET: {
    getBastLog: (bastId: ParamID) =>
      `/course/vendor/bast/${bastId}/log`,
  },
  PUT: {
    updateExtCourseClaim: (claimId: ParamID) =>
      `/course/dashboard/update/status/${claimId}`,
  },
};
