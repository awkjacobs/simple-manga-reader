export interface FileOperationsAPI {
    copyFile: (file: File) => Promise<{
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
