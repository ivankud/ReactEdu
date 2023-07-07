const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
  switch (process.platform) {
    case 'darwin':
      return path.join(__dirname, '..', '.tmp', 'mac', 'BozonElecEdu.app', 'Contents', 'MacOS', 'BozonElecEdu')
    case 'linux':
      return path.join(__dirname, '..', '.tmp', 'linux', 'BozonElecEdu')
    case 'win32':
      return path.join(__dirname, '..', '.tmp', 'win-unpacked', 'BozonElecEdu.exe')
    default:
      throw Error(`Unsupported platform ${process.platform}`)
  }
}
global.app = new Application({ path: appPath() })
