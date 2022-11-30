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