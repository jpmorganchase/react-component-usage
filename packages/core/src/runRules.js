/* Copyright 2022 J.P. Morgan Chase & Co.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
    the License. You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License. 
    
    SPDX-License-Identifier: Apache-2.0 
*/

const fs = require('fs');
const tsquery = require('@phenomnomnominal/tsquery').tsquery;

module.exports = function runRules({ast, ruleConfigs, language, filePath, metaData, ruleDefinitionPath}) {
  let finalResponse = {};
  const managedRulesString = fs.readFileSync(ruleDefinitionPath, 'utf-8');
  const managedRules = JSON.parse(managedRulesString);

  for(const ruleConfig of ruleConfigs){
    const ruleId = ruleConfig.ruleId;
    const configId = ruleConfig.configId;
    const configLanguage = ruleConfig.language;

    if(configLanguage !== language){
      return;
    }

    const managedRule = managedRules[ruleId];
    if (managedRule == null) {
      return;
    }

    let rulesQuery = managedRule.rules(ruleConfig);

    let outputList = [];

    if (typeof rulesQuery === 'function') {
      outputList = rulesQuery(ast);
    } else {
      if (Array.isArray(rulesQuery) === false) {
        rulesQuery = [rulesQuery];
      }
      for (const ruleQuery of rulesQuery) {
        outputList = [
          ...outputList,
          ...tsquery(ast, ruleQuery, { visitAllChildren: true })
        ];
      }
    }

    let formattedOutput = [];

    for (let output of outputList) {
      let contextualLevel =
        Number(ruleConfig.contextLevel) ||
        Number(managedRule.contextLevel) ||
        0;
      while (contextualLevel > 0) {
        if (output.parent != null) {
          output = output.parent;
          contextualLevel--;
        } else {
          break;
        }
      }
      formattedOutput.push(output.getFullText().trim());
    }
    if (formattedOutput.length > 0) {
      finalResponse[configId] = {
        ...metaData,
        snippet: formattedOutput,
        filePath
      };
    }
  }

  return finalResponse;
}
