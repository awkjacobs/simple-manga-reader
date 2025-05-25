import { BrowserWindow } from "electron"
import { addThemeEventListeners } from "./theme/theme-listeners"
import { addWindowEventListeners } from "./window/window-listeners"
import { registerFileHandlers } from "./files/file-handlers"

export default function registerListeners(mainWindow: BrowserWindow) {
    addWindowEventListeners(mainWindow)
    addThemeEventListeners()
    registerFileHandlers()
}
