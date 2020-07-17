module.exports = ({ env }) => ({
  url: 'http://localhost',
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
});
