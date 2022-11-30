const https = require('https');
const fetch = require('node-fetch');

const agent = new https.Agent({
  rejectUnauthorized: false
});

function postData(ruleResponseApiUrl, requestObject) {
  const payload = JSON.stringify(requestObject);
  fetch(ruleResponseApiUrl, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    agent: agent
  })
    .then(response => {
        if (response.ok) {
          console.debug(
            'Metrics upload successful! Server responded with:',
            response.status,
            response.statusText
          );
        } else {
          response
            .json()
            .then(json =>
              console.debug('Response from server: ', JSON.stringify(json))
            );
          throw new Error();
        }
    })
    .catch(err => {
        console.debug('Upload Failed:', err);
    });
}

module.exports = postData;
