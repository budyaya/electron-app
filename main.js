const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    // 注册一个名为 ping 的异步 IPC 事件处理程序
    ipcMain.handle('ping', () => 'pong')
    createWindow()
    app.on('activate', () => {
        console.log('activate')
        // if (BrowserWindow.getAllWindows().length === 0) {
        //     createWindow()
        // }
    })
})
app.on('window-all-closed', () => {
    console.log('window-all-closed')
    //if (process.platform !== 'darwin') {}
    app.quit()
})