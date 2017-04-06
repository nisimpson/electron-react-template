/* @file: electron-main.js
 * @desc: Entry point for electron application
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object; otherwise, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
    // Create the browser window...
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    // ...and load the index.html of the app.
    // ${app_root}/build/index.html in PRODUCTION
    // webpack_dev_server in DEVELOPMENT (usually localhost:3000)
    const appUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '..', 'build', 'index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(appUrl);

    // Open the DevTools (comment out this line in production)
    if (process.env.ELECTRON_START_URL) {
        mainWindow.webContents.openDevTools();
    }

    // Handle event when main window closes.
    mainWindow.on('closed', () => {
        // Dereference the main window, usually you would store windows
        // in an array if your app supports multi windows; this is the
        // time when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Handle event when all application windows are closed.
app.on('window-all-closed', () => {
    // On macos, it is common for application and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Handle event when application is active
app.on('activate', () => {
    // On macos it is common for re-create a window in the app when
    // the dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of the app's specific main
// process code. You can also put them in separate files and import
// them here.
