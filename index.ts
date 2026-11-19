#!/usr/bin/env node
const inquirer = require('inquirer')
const AdmZip = require('adm-zip');
const chalk = require('chalk');
const path  = require('path')

const zip = new AdmZip();

inquirer
    .prompt([{
        type: 'input',
        name: 'filePath',
        message: '请输入需要压缩文件的绝对路径(默认当前目录下的dist文件夹):'
    },{
        type: 'input',
        name: 'fileZip',
        message: '请输入压缩后的文件名(默认dist.zip):'
    }])
    .then(answers => {
        const {filePath, fileZip} = answers
        zip.addLocalFolder(filePath ? filePath.trim() : process.cwd() + '/dist', 'dist');
        zip.addLocalFile(`${path.resolve(__dirname, './template/package.json')}`);
        zip.addLocalFile(`${path.resolve(__dirname, './template/package-lock.json')}`);
        zip.writeZip(process.cwd() + `/${fileZip ? fileZip : 'dist'}.zip`);
        console.log(chalk.green("文件压缩成功！"))
    })
