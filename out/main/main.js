"use strict";
const electron = require("electron");
const utils = require("@electron-toolkit/utils");
const path = require("path");
const os = require("os");
const handleIPC = (channel, handler) => {
  electron.ipcMain.handle(channel, handler);
};
const registerWindowIPC = (mainWindow) => {
  mainWindow.setMenuBarVisibility(false);
  handleIPC("init-window", () => {
    const { width, height } = mainWindow.getBounds();
    const minimizable = mainWindow.isMinimizable();
    const maximizable = mainWindow.isMaximizable();
    const platform = os.platform();
    return { width, height, minimizable, maximizable, platform };
  });
  handleIPC("is-window-minimizable", () => mainWindow.isMinimizable());
  handleIPC("is-window-maximizable", () => mainWindow.isMaximizable());
  handleIPC("window-minimize", () => mainWindow.minimize());
  handleIPC("window-maximize", () => mainWindow.maximize());
  handleIPC("window-close", () => mainWindow.close());
  handleIPC("window-maximize-toggle", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });
  const webContents = mainWindow.webContents;
  handleIPC("web-undo", () => webContents.undo());
  handleIPC("web-redo", () => webContents.redo());
  handleIPC("web-cut", () => webContents.cut());
  handleIPC("web-copy", () => webContents.copy());
  handleIPC("web-paste", () => webContents.paste());
  handleIPC("web-delete", () => webContents.delete());
  handleIPC("web-select-all", () => webContents.selectAll());
  handleIPC("web-reload", () => webContents.reload());
  handleIPC("web-force-reload", () => webContents.reloadIgnoringCache());
  handleIPC("web-toggle-devtools", () => webContents.toggleDevTools());
  handleIPC("web-actual-size", () => webContents.setZoomLevel(0));
  handleIPC("web-zoom-in", () => webContents.setZoomLevel(webContents.zoomLevel + 0.5));
  handleIPC("web-zoom-out", () => webContents.setZoomLevel(webContents.zoomLevel - 0.5));
  handleIPC("web-toggle-fullscreen", () => mainWindow.setFullScreen(!mainWindow.fullScreen));
  handleIPC("web-open-url", (_e, url) => electron.shell.openExternal(url));
};
const appIcon = path.join(__dirname, "../../resources/build/icon.png");
function createAppWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    backgroundColor: "#1c1c1c",
    icon: appIcon,
    frame: false,
    titleBarStyle: "hiddenInset",
    title: "Electron React App",
    maximizable: false,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      sandbox: false
    }
  });
  mainWindow.webContents.openDevTools();
  registerWindowIPC(mainWindow);
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (!electron.app.isPackaged && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  createAppWindow();
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createAppWindow();
    }
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
