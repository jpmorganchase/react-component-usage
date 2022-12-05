/* Copyright 2022 J.P. Morgan Chase & Co.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
    the License. You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License. 
    
    SPDX-License-Identifier: Apache-2.0 
*/

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
