const { exec } = require('child_process');

// 获取当前时间
const currentTime = new Date();

// 格式化时间戳
const timestamp = currentTime.toISOString().replace(/T/, ' ').replace(/\..+/, '');

// 构造commit消息
const commitMessage = `Site updated: ${timestamp}`;

function runCommand(command, callback) {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing command "${command}": ${err}`);
      callback(err);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    console.log(stdout);
    callback(null);
  });
}

runCommand('git add -A', (err) => {
  if (err) return;

  runCommand(`git commit -m "${commitMessage}"`, (err) => {
    if (err) return;
    
    runCommand('git push', (err) => {
      if (err) return;
      
      console.log('代码已成功推送到远程仓库！');
    });
  });
});
