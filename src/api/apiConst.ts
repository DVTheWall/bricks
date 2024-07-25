export const POST = 'POST';
export const GET = 'GET';
export const PUT = 'PUT';

export const api = {
  // auth
  login: 'bricks.api.auth.login',
  sendOtp: 'bricks.api.auth.send_otp',
  verifyOtp: 'bricks.api.auth.verify_otp',
  signUp: 'bricks.api.customer.sign_up',
  verifyPAN: 'bricks.api.customer.pan_verification',
  verifyAdhar: 'bricks.api.customer.send_aadhaar_otp',
  verifyAdharOtp: 'bricks.api.customer.verify_aadhaar_otp',
  verifyNewMobileOtp: 'bricks.api.customer.verify_otp',

  // profile
  walletProfile: 'bricks.api.wallet.profile',

  // property
  getPropertyList: 'bricks.api.properties.properties_list',
  getPropertyDetails: 'bricks.api.properties.properties_details',

  // transactions
  myTransactions: 'bricks.api.wallet.my_transactions',
  addMoney: 'bricks.api.wallet.add_money',
  addMoneyReject: 'bricks.api.wallet.add_money_reject',
  withdrawMoney: 'bricks.api.wallet.withdrawal_money',

  // order
  investNowOrder: 'bricks.api.order.invest_now',

  // homepage
  getHomePageData: 'bricks.api.home_page_config.home_page_config',

  // portfolio
  getPortfolioData: 'bricks.api.wallet.portfolio',

  // Fcm Token
  fcmToken: 'bricks.api.auth.fcm_token',
};
