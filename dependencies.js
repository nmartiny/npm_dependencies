const {readFileSync, lstatSync, readdirSync} = require('fs')
const {join} = require('path')

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory)
const readDirectory = source => readdirSync(source)

const recursive = (parent, ) => {

}

const nodeModules = 'node_modules'
const packageJSON = 'package.json'

let packages = readFileSync('package.json')
packages = JSON.parse(packages)

const ppalDependencies = packages.dependencies
const ppalDepsKeys = Object.keys(ppalDependencies)

let depsTree = []
let auxDepsTreeObj = {}
let npmModule

ppalDepsKeys.forEach(mdl => {
  auxDepsTreeObj.name = mdl
  npmModule = getDirectories(nodeModules).find(name => name === join(nodeModules, mdl))
  if (npmModule) {
    let npmFiles = readDirectory(npmModule)
    let npmFile = join(npmModule, npmFiles.find(file => file === packageJSON))
    if (npmFile) {
      npmFile = readFileSync(npmFile)
      npmFile = JSON.parse(npmFile)
      if (npmFile.version) {
        auxDepsTreeObj.version = npmFile.version
        let deps = npmFile.dependencies
        if (deps && deps.length) {
          deps = Object.keys(deps)
          let hasDeps = true
          while (hasDeps) {

          }

          auxDepsTreeObj.dependencies = deps
        }
      }
    }
  }
  depsTree.push(auxDepsTreeObj)
  auxDepsTreeObj = {}
})

console.log(depsTree)
