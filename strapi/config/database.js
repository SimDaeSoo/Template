module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        username: env('DATABASE_USERNAME', 'daesoo94'),
        password: env('DATABASE_PASSWORD', 'vndtkstla2'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {
        "useNullAsDefault": true,
        "pool": {
          "min": 1,
          "max": 4,
          "idleTimeoutMillis": 30000,
          "createTimeoutMillis": 30000,
          "acquireTimeoutMillis": 30000
        }
      }
    },
  },
});
