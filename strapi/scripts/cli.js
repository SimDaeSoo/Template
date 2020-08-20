const strapi = require('strapi')();
const program = require('commander');
const setProvider = require('./setProvider');

program
  .command('setProvider')
  .description('set provider')
  .action(async () => {
    strapi.start(async () => {
      try {
        await setProvider(strapi);
      } catch (e) {
        strapi.log.info('set provider fail..');
        strapi.log.error(e);
        strapi.server.destroy();
        process.exit(0);
      }
      strapi.log.info('set provider sucess!!');
      strapi.server.destroy();
      process.exit(0);
    });
  });

program.parse(process.argv);
