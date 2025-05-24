import { ipcMain, app } from "electron"
import { FileChannels } from "./file-channels"
import path from "path"
import fs from "fs/promises"

export function registerFileHandlers() {
    console.log("Registering file handlers...")

    // Get the app's local storage path
    ipcMain.handle(FileChannels.GET_APP_DATA_PATH, async () => {
        console.log("GET_APP_DATA_PATH handler called")
        const userDataPath = app.getPath("userData")
        const storagePath = path.join(userDataPath, "manga-storage")

        // Ensure the storage directory exists
        try {
            await fs.mkdir(storagePath, { recursive: true })
        } catch (error) {
            console.error("Failed to create storage directory:", error)
        }

        return storagePath
    }) // Copy file to app storage
    ipcMain.handle(FileChannels.COPY_FILE, async (_, filePath: string) => {
        console.log("COPY_FILE handler called with path:", filePath)
        try {
            const userDataPath = app.getPath("userData")
            const storagePath = path.join(userDataPath, "manga-storage")
            const fileName = path.basename(filePath)
            const destination = path.join(storagePath, fileName)

            // Ensure directory exists
            await fs.mkdir(storagePath, { recursive: true })

            // Copy the file
            await fs.copyFile(filePath, destination)

            return {
                success: true,
                storedPath: destination,
            }
        } catch (error) {
            console.error("Failed to copy file:", error)
            return {
                success: false,
                error:
                    typeof error === "object" &&
                    error !== null &&
                    "message" in error
                        ? (error as { message: string }).message
                        : String(error),
            }
        }
    })
}
