const { Command } =  require('commander');

const program = new Command();

program
.name('react-component-usage')
.description('CLI to run the component usage analytics library')
.version('1.0.0') // TODO: Read from package.json
.option('-ef','--entry-file <filepath>', 'provide entry file to start code analysis')
.option('-rf','--rules-folder <filepath>', 'provide defined rules to run and extract code snippets')
.option('-l','--language <language>', 'provide language from one of ts, tsx, js and jsx')

program.parse();

module.exports = program;