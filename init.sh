# 确保脚本抛出遇到的错误
set -e
# 建立git，并上传readme到master分支
git init
git add README.md
git commit -m 'init: master project'
git branch -M master
git remote add origin "{{gitAddress}}"
git push -u origin master


# 建立dev并提交所有的文件
git branch dev
git checkout dev
git add -A
git commit -m 'init: dev project'
git push -u origin dev


# 项目安装依赖
npm i

# 安装完成之后删除脚本
rm -rf init.sh