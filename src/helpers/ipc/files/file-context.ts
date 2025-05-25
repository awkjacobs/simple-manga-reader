import { webUtils } from "electron"
import { FileChannels } from "./file-channels"

export function exposeFileContext() {
    const { contextBridge, ipcRenderer } = window.require("electron")
    contextBridge.exposeInMainWorld("fileOps", {
        copyFile: (file: File) => {
            const path = webUtils.getPathForFile(file)

            if (process.env.NODE_ENV === "development") {
                console.log("copyFile called from renderer")
            }

            return ipcRenderer
                .invoke(FileChannels.COPY_FILE, path)
                .catch((error: unknown) => {
                    console.error("Failed to get copy file:", error)
                    throw error
                })
        },

        getStoragePath: () => {
            if (process.env.NODE_ENV === "development") {
                console.log("getStoragePath called from renderer")
            }
            return ipcRenderer
                .invoke(FileChannels.GET_APP_DATA_PATH)
                .catch((error: unknown) => {
                    console.error("Failed to get storage path:", error)
                    throw error
                })
        },
    })
}
