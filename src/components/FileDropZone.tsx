import React, { useState, useCallback, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { FileMetadata } from "@/types/file-operations"
import { FileMetadataDialog } from "./FileMetadataDialog"

export function FileDropZone() {
    const [isDragging, setIsDragging] = useState(false)
    const [status, setStatus] = useState<string>("")
    const [dragCounter, setDragCounter] = useState<number>(0)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [droppedFiles, setDroppedFiles] = useState<File[]>([])

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragCounter((prev) => prev + 1)
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragCounter((prev) => {
            const newCount = prev - 1
            console.log("Drag counter:", newCount)
            if (newCount === 0) {
                setIsDragging(false)
            }
            return newCount
        })
    }, [])

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        setDragCounter(0)
        console.log("Dropped:", e.dataTransfer)
        const files = Array.from(e.dataTransfer.files)
        console.log("Dropped files:", files)

        setDroppedFiles(files)
        setDialogOpen(true)
    }, [])

    const handleSaveMetadata = async (metadata: FileMetadata[]) => {
        if (metadata.length !== droppedFiles.length) {
            setStatus("Error: Metadata count doesn't match file count")
            return
        }

        const results: string[] = []
        for (let i = 0; i < droppedFiles.length; i++) {
            const file = droppedFiles[i]
            const meta = metadata[i]

            try {
                const result = await window.fileOps.copyFile(file)
                console.log("Copy result:", result)
                if (result.success) {
                    results.push(
                        `✓ "${meta.displayName}" imported successfully`,
                    )
                } else {
                    results.push(
                        `✗ Failed to import "${meta.displayName}": ${result.error}`,
                    )
                }
            } catch (error) {
                results.push(
                    `✗ Error importing "${meta.displayName}": ${
                        error instanceof Error ? error.message : String(error)
                    }`,
                )
            }
        }
        setStatus(results.join("\n"))
        setDroppedFiles([])
    }

    useEffect(() => {
        setDragCounter(0)
    }, [isDragging])

    return (
        <>
            <Card
                className={`w-full p-8 text-center transition-colors ${
                    isDragging ? "bg-accent" : "bg-card"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="text-lg font-medium">
                    {isDragging
                        ? "Drop files here"
                        : "Drag and drop files here"}
                </div>
                {status && (
                    <div className="text-muted-foreground mt-4 text-sm">
                        {status}
                    </div>
                )}
            </Card>

            <FileMetadataDialog
                files={droppedFiles}
                open={dialogOpen}
                onClose={() => {
                    setDialogOpen(false)
                    setDroppedFiles([])
                }}
                onSave={handleSaveMetadata}
            />
        </>
    )
}
