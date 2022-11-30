const madge = require('madge');

module.exports = async function getDependencyTree(entryFile, baseDir) {
  if(entryFile){
    const response = await madge(entryFile, { baseDir });
    return Object.keys(response.tree);
  }

  // TODO: fallback option of reading the entire base directory
 
}
