const typescript = require('./typescript');

function parser(file, basePath){

    switch(true){
        case /.tsx?$/.test(file):
            return {
              ast:  typescript(file, basePath),
              language: 'typescript'
            }
        case /.jsx?$/.test(file):
            return {
                ast:  typescript(file, basePath),
                language: 'javascript'
            }
        default:
            console.log(`no parser present`, file);
    }
}

module.exports = parser;