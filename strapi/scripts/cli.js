const strapi = require('strapi')();
const program = require('commander');
const setup = require('./setup');

program
  .command('setup')
  .description('setup')
  .action(async () => {
    strapi.start(async () => {
      try {
        await setup(strapi);
      } catch (e) {
        strapi.log.info('서버 셋업 실패');
        strapi.log.error(e);
        strapi.server.destroy();
        process.exit(0);
      }
      strapi.log.info('서버 셋업 완료');
      strapi.server.destroy();
      process.exit(0);
    });
  });

program.parse(process.argv);
