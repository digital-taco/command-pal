const { resolve } = require('path')
const { promisify } = require('util')
const watch = require('node-watch')
const { getBrowser, closeOpenBrowsers } = require('./chromium-controller')

const cp = require('child_process');
const exec = promisify(cp.exec)

async function changeHandler (evt, name) {
  name && console.log(`[Change Detected]: ${name}, rebuilding...`)
  await exec(`${resolve('./node_modules/.bin/rollup')} --config ${resolve('.')}/rollup.config.js`)
  await closeOpenBrowsers()
  await getBrowser()
  name && console.log(`Done.`)
}

watch(resolve('./src'), { recursive: true }, changeHandler);

changeHandler()

process.on('exit', () => closeOpenBrowsers())