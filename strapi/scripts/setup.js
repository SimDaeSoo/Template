async function setup(strapi) {
  const pluginStore = strapi.store({
    type: 'plugin',
    environment: '',
    name: 'users-permissions',
  });
  const grantValue = await pluginStore.get({ key: 'grant' });
  if (grantValue) {
    console.log(grantValue)
    try {
      await pluginStore.set({
        key: 'grant',
        value: {
          ...grantValue,
          google: {
            enabled: true,
            icon: 'google',
            key: process.env.GOOGLE_CLIENT_ID || '',
            secret: process.env.GOOGLE_CLIENT_SECRET || '',
            callback: `${process.env.BROWSER_HOST || 'http://localhost'}/provider/google`,
            redirectUri: `${process.env.BROWSER_HOST || 'http://localhost'}/connect/google/callback`,
            scope: ['email', 'profile'],
          },
        },
      });
    } catch (e) {
      throw e;
    }
  } else {
    throw new Error('')
  }
}

module.exports = setup;
