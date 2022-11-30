const loadRuleConfigs = require('./loadRuleConfigs');
const findStartFile = require('./findStartFile');
const getDependencyTree = require('./getDependencyTree');
const parser = require('./parser');
const runRules = require('./runRules');
const {
  accumulateResponse,
  getFinalResponse
} = require('./responseAccumulator');
const postData = require('./postData');

async function orchestrator({
  entryFile,
  baseDir,
  ruleDefinitionPath,
  externalApiConfig: {
    ruleRequestApiUrl,
    ruleRequestConfigPath,
    ruleResponseApiUrl
  },
  metaData
}) {
  // loadRuleConfig from server
  // receive the config from serer
  // findStartFile
  // create a dependency graph
  // load files
  // for each file
  // create ast
  // call runRules with ast and config
  // for each config find the corresponding rule
  // and generate the data
  // store the data in memory
  // run it for all files(jsx, js, ts, tsx)
  // collect data for all files
  // send the data
  // exit the process

  const ruleConfigs = await loadRuleConfigs(ruleRequestApiUrl, ruleRequestConfigPath);
  const startFile = findStartFile(entryFile, baseDir);
  const files = await getDependencyTree(startFile, baseDir); 

  for (const file of files) {
    const {ast, language} = parser(file, baseDir);
    const finalResponse = runRules({ast,ruleConfigs, language, file, metaData, ruleDefinitionPath});
    accumulateResponse(finalResponse);
  }

  const response = getFinalResponse();
  postData(ruleResponseApiUrl, response);
}

module.exports = orchestrator;
