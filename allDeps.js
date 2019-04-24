const fs = require('fs')

const NODE_MODULES = 'node_modules/'
const PACKAGE_JSON = 'package.json'

const walkSync = function (dir, filelist) {
  let files = fs.readdirSync(dir)
  filelist = filelist || []
  files.forEach(file => {
    if (fs.statSync(`${dir}/${file}`).isDirectory()) {
      filelist = walkSync(`${dir}/${file}/`, filelist)
    } else {
      if (file === PACKAGE_JSON) filelist.push(`${dir}/${file}`)
    }
  })
  return filelist
}

const getAllDependencies = () => {
  const allPackages = walkSync(NODE_MODULES, [])
  let depsTree = []
  let auxDepsTreeObj = {}
  let npmModule

  allPackages.forEach(package => {
    npmModule = fs.readFileSync(package)
    npmModule = JSON.parse(npmModule)
    auxDepsTreeObj.name = npmModule.name
    auxDepsTreeObj.version = npmModule.version
    depsTree.push(auxDepsTreeObj)
    auxDepsTreeObj = {}
  })

  return depsTree
}

exports.module = {getAllDependencies}
