import { FileChannels } from "./file-channels"

export function exposeFileContext() {
    const { contextBridge, ipcRenderer } = window.require("electron")
    contextBridge.exposeInMainWorld("fileOps", {
        copyFile: (filePath: string) => {
            console.log("copyFile called from renderer with path:", filePath)
            return ipcRenderer.invoke(FileChannels.COPY_FILE, filePath)
        },
        getStoragePath: () => {
            console.log("getStoragePath called from renderer")
            return ipcRenderer.invoke(FileChannels.GET_APP_DATA_PATH)
        },
    })
}
