export const {
  PORT = 9000,
  SESS_NAME = 'sid',
  SESS_SECRET = 'sessionsecret',
  SESS_LIFETIME = 1000 * 60 * 60 * 7
} = process.env;