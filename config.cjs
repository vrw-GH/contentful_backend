let envs;
try {
  dotenv = require("dotenv");
  const result = dotenv.config();
  if (!("error" in result)) {
    envs = result.parsed;
  }
} catch (e) {
  ld = require("lodash");
  envs = {};
  ld.each(process.env, (value, key) => (envs[key] = value));
}

module.exports = envs;
