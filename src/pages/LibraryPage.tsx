import React from "react"
import Footer from "@/components/template/Footer"
import { FileDropZone } from "@/components/FileDropZone"

export default function LibraryPage() {
    return (
        <div className="flex h-full flex-col">
            <div className="flex flex-1 flex-col items-center justify-center gap-2">
                <FileDropZone />
            </div>
            <Footer />
        </div>
    )
}
