import { createRoot } from "react-dom/client";
import { App } from "../runtime/App";

function renderInBrowser() {
    // This is the entry point for the browser
    const root = document.getElementById("root");
    if (!root) {
        throw new Error("Could not find root element");
    }
  createRoot(root).render(<App />);
}

renderInBrowser();