export interface FileOperationsAPI {
    /**
     * Copies a file to the application's storage directory
     * @param file The file to copy
     * @returns Promise resolving to operation result
     */
    copyFile: (
        file: File,
    ) => Promise<
        | { success: true; storedPath: string }
        | { success: false; error: string }
    >
    /**
     * Gets the application's storage path
     * @returns Promise resolving to the storage directory path
     */
    getStoragePath: () => Promise<string>
}
export interface FileMetadata {
    originalName: string
    displayName: string
    series?: string
    volume?: string
    chapter?: string
}

declare global {
    interface Window {
        fileOps: FileOperationsAPI
    }
}
