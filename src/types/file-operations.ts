export interface FileOperationsAPI {
    showFilePath: (file: File) => string
    copyFile: (filePath: string) => Promise<{
        success: boolean
        storedPath?: string
        error?: string
    }>
    getStoragePath: () => Promise<string>
}

declare global {
    interface Window {
        fileOps: FileOperationsAPI
    }
}
