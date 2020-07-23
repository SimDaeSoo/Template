module.exports = ({ env }) => ({
  url: env('BASE_URL', ''),
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '70f2c3415b0da6109ebffd8d72533a35'),
    },
  },
});
