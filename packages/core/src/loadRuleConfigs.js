const https = require('https');
const fs = require('fs');
const fetch = require('node-fetch');

const agent = new https.Agent({
  rejectUnauthorized: false
});

module.exports = (ruleRequestApiUrl, ruleRequestConfigPath) => {
  const config = fs.readFileSync(ruleRequestConfigPath, 'utf-8'); // TODO: handle the exception and fallback
  return new Promise((resolve, reject) => {
    fetch(ruleRequestApiUrl, {
      agent
    })
      .then(async res => {
        if (res.ok) {
          try {
            const json = await res.json().catch(() => resolve(config));
            if (Array.isArray(json) && json.length > 0) {
              resolve(json);
            } else {
              resolve(config);
            }
          } catch (e) {
             console.error(e);
          }
        }
      })
      .catch(e => {
        // if there is any error, then use the default config
        resolve(config);
      });
  });
};
