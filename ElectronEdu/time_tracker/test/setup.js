const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
  switch (process.platform) {
    case 'darwin':
      return path.join(__dirname, '..', '.tmp', 'mac', 'TimeTracker.app', 'Contents', 'MacOS', 'TimeTracker')
    case 'linux':
      return path.join(__dirname, '..', '.tmp', 'linux', 'TimeTracker')
    case 'win32':
      return path.join(__dirname, '..', '.tmp', 'win-unpacked', 'TimeTracker.exe')
    default:
      throw Error(`Unsupported platform ${process.platform}`)
  }
}
global.app = new Application({ path: appPath() })
