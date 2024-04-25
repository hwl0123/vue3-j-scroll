import { exec } from 'child_process';

// 获取从命令行传入的提交信息
const commitMessage = process.argv[2] || 'Release commit';

// 构建执行的命令
const command = `git commit -m "${commitMessage}" && git push origin master`;

// 执行命令
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});