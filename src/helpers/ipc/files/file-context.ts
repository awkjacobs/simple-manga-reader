import { webUtils } from "electron"
import { FileChannels } from "./file-channels"

export function exposeFileContext() {
    const { contextBridge, ipcRenderer } = window.require("electron")
    contextBridge.exposeInMainWorld("fileOps", {
        showFilePath: (file: File) => {
            // It's best not to expose the full file path to the web content if
            // possible.
            const path = webUtils.getPathForFile(file)
            console.log(`File path: ${path}`)
            return path
        },

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
