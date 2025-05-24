import React, { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"

declare global {
    interface Window {
        fileOps: {
            copyFile: (filePath: string) => Promise<{
                success: boolean
                storedPath?: string
                error?: string
            }>
            getStoragePath: () => Promise<string>
        }
    }
}

export function FileDropZone() {
    const [isDragging, setIsDragging] = useState(false)
    const [status, setStatus] = useState<string>("")

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const files = Array.from(e.dataTransfer.files)
        console.log("Dropped files:", files)

        for (const file of files) {
            console.log("Processing file:", file.path)
            try {
                const result = await window.fileOps.copyFile(file.path)
                if (result.success) {
                    setStatus(`File "${file.name}" imported successfully`)
                } else {
                    setStatus(
                        `Failed to import "${file.name}": ${result.error}`,
                    )
                }
            } catch (error) {
                setStatus(
                    `Error importing "${file.name}": ${
                        error instanceof Error ? error.message : String(error)
                    }`,
                )
            }
        }
    }, [])

    return (
        <Card
            className={`p-8 text-center transition-colors ${
                isDragging ? "bg-accent" : "bg-card"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="text-lg font-medium">
                {isDragging ? "Drop files here" : "Drag and drop files here"}
            </div>
            {status && (
                <div className="text-muted-foreground mt-4 text-sm">
                    {status}
                </div>
            )}
        </Card>
    )
}
