export const POST = 'POST';
export const GET = 'GET';
export const PUT = 'PUT';

export const api = {
  // auth
  login: 'bricks.api.auth.login',
  sendOtp: 'bricks.api.auth.send_otp',
  verifyOtp: 'bricks.api.auth.verify_otp',
  signUp: 'bricks.api.customer.sign_up',

  // profile
  walletProfile: 'bricks.api.wallet.profile',

  // property
  getPropertyList: 'bricks.api.properties.properties_list',
  getPropertyDetails: 'bricks.api.properties.properties_details',

  // transactions
  myTransactions: 'bricks.api.wallet.my_transactions',
};
