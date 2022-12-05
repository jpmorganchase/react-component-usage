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
