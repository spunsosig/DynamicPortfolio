const requiredEnvVars = [
  'PORT',
  'FRONTEND_URL',
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
  'EMAIL_USER',
  'EMAIL_PASS',
  'NODE_ENV',
  'EMAIL_SERVICE'
];

function validateEnv() {
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

module.exports = validateEnv;