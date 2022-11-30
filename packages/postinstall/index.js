const {codeAnalyzer} = require('@react-component-usage/core');

codeAnalyzer({
    entryFile,
    baseDir,
    ruleDefinitionPath,
    externalApiConfig: {
      ruleRequestApiUrl,
      ruleRequestConfigPath,
      ruleResponseApiUrl
    },
    metaData
})