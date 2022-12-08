/* Copyright 2022 J.P. Morgan Chase & Co.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
    the License. You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License. 
    
    SPDX-License-Identifier: Apache-2.0 
*/

const orchestrator = require('./orchestrator');

function codeAnalyzer({
  entryFile,
  baseDir,
  ruleDefinitionPath,
  externalApiConfig: {
    ruleRequestApiUrl,
    ruleRequestConfigPath,
    ruleResponseApiUrl
  },
  metaData
}){
  orchestrator({
    entryFile,
    baseDir,
    ruleDefinitionPath,
    externalApiConfig: {
      ruleRequestApiUrl,
      ruleRequestConfigPath,
      ruleResponseApiUrl
    },
    metaData
  }).catch(() => process.exit(0))
}

module.exports = codeAnalyzer;
