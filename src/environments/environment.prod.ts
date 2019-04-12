export const environment = {
  production: true,
  steemConnectConfig: {
    clientId: 'webpad.app',
    redirectUrl: 'http://localhost:4200/',
    scope: ['comment', 'comment_options']
  },
  steemRPCConfig: {
    node: 'https://anyx.io/'
  }
};
