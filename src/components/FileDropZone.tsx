import React, { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { FileOperationsAPI } from "@/types/file-operations"

declare global {
    interface Window {
        fileOps: FileOperationsAPI
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
        console.log("Files dropped:", e)
        const files = Array.from(e.dataTransfer.files)
        console.log("Dropped files:", files)

        for (const file of files) {
            const path = window.fileOps.showFilePath(file)
            console.log("Processing file:", path)
            try {
                if (!path) {
                    setStatus(
                        `File "${file.name}" cannot be processed: no file path available`,
                    )
                    continue
                }
                const result = await window.fileOps.copyFile(path)
                console.log("Copy result:", result)
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
