const fs = require('fs');
const path = require('path');

const tsquery = require('@phenomnomnominal/tsquery').tsquery;
const ts = require('typescript');

function parser(file, basePath) {
  const scriptAsString = fs.readFileSync(path.join(basePath, file), 'utf-8');
  const ast = tsquery.ast(scriptAsString, null, ts.ScriptKind.TSX);
  return ast;
}

module.exports = parser;
