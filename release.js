import { execSync } from 'child_process';

// 读取命令行参数
const commitMessage = process.argv[2];

// 如果没有提供提交信息，抛出错误
if (!commitMessage) {
  throw new Error('Commit message is required');
}
// 执行git命令
execSync(`git add .`, { stdio: 'inherit' });
execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
execSync(`git push origin master`, { stdio: 'inherit' });