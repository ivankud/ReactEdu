const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
  switch (process.platform) {
    case 'darwin':
      return path.join(__dirname, '..', '.tmp', 'mac', 'BozonElecEduIpc.app', 'Contents', 'MacOS', 'BozonElecEduIpc')
    case 'linux':
      return path.join(__dirname, '..', '.tmp', 'linux', 'BozonElecEduIpc')
    case 'win32':
      return path.join(__dirname, '..', '.tmp', 'win-unpacked', 'BozonElecEduIpc.exe')
    default:
      throw Error(`Unsupported platform ${process.platform}`)
  }
}
global.app = new Application({ path: appPath() })
