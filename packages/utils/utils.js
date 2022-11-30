const shell = require('shelljs');

exports.getGitInfo = (dir) => {
  let url = '';
  if (shell.which('git', { silent: true }).stdout.length > 0) {
    url = shell
      .exec(` cd ${dir} &&git config --get remote.origin.url`, {
        silent: true
      })
      .stdout.trim();
  }

  return url;
}