# @react-component-usage/core

This package is the core algorithm we use to extract component usage information from repository

This is a CLI tool

### Params

- Path where rules are stored
- Meta Data to pass to server
- Entry File
- Config 
    - repo details
    - rules config API
    - result API
- extensions ( tsx, ts, js, jsx )

### What are the limitations?

- TypeScript dependent
- Scss parsing
- CSS parsing


### Configuration 

```
{
    "silent" : boolean, // throw error in case of any failure
    "extensions" : ["tsx", "jsx", "js", "ts"] // which files to be parsed
    "api" :  {
        "request" : "https://fetch-curated-rule-configuration" // should follow schema configuration
        "response": ""
    }
}

```


### Schema

```
ConfigRequestType {
    configId: string;
    ruleId: 'ImportDeclaration',
    parameter: {
        rulePassRegex? : string;
        rulePassExpression?: string;
    };
    contextLevel: number;
}

```
