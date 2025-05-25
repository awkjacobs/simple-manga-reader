import { ipcMain, app } from "electron"
import { FileChannels } from "./file-channels"
import path from "path"
import fs from "fs/promises"

async function ensureStorageDirectory(): Promise<string> {
    const userDataPath = app.getPath("userData")
    const storagePath = path.join(userDataPath, "manga-storage")

    try {
        await fs.mkdir(storagePath, { recursive: true })
    } catch (error) {
        console.error("Failed to create storage directory:", error)
        throw error
    }

    return storagePath
}

export function registerFileHandlers() {
    console.log("Registering file handlers...")

    // Get the app's local storage path
    ipcMain.handle(FileChannels.GET_APP_DATA_PATH, async () => {
        console.log("GET_APP_DATA_PATH handler called")
        return await ensureStorageDirectory()
    })
    // Copy file to app storage
    ipcMain.handle(FileChannels.COPY_FILE, async (_, filePath: string) => {
        console.log("COPY_FILE handler called with path:", filePath)
        try {
            const storagePath = await ensureStorageDirectory()

            // Validate the file path to prevent directory traversal
            const resolvedPath = path.resolve(filePath)
            if (
                !resolvedPath.startsWith(path.resolve("/")) ||
                resolvedPath.includes("..")
            ) {
                throw new Error("Invalid file path")
            }

            const fileName = path.basename(filePath)
            const destination = path.join(storagePath, fileName)

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
