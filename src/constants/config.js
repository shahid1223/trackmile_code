const config = {
  baseUrl: 'https://dev.track-mile.com/api',
  getDriverList: '/getDriverList',
  getUserList: '/getUserList',
  getDriverGroupList: '/lookUp/getDriverGroupList',
  getVehicleTypeList:'/lookUp/getVehicleType',
  getProfileList: '/getProfileList',
  deleteUser: '/deleteUser',
  login: '/login',
  saveUser: '/saveUser',
  saveDriverRates: '/rateDetails/saveDriverRateDtl',
  saveOrUpdateRunsheet: '/runsheet/manual/saveOrUpdate',
  deleteRunsheets: '/runsheet/manual/remove',
  getRunsheetSummary: '/runsheet/manual/summary',
  getDateRangeRunsheets: '/runsheet/manual/date-range-runsheets',
  approveRunsheet: '/runsheet/manual/verified-hours',
  getApprovedRunsheets: '/runsheet/manual/reports/approved',
  getVerifiedRunsheets: '/runsheet/manual/reports/verified',
  submitRunsheet: '/runsheet/manual/submit',
  updateUser: '/updateUser',
  getDriverCurrentRates:"/rateDetails/getDriverCurrentRates",
  changePassword: '/changePassword',
}

export default config;
