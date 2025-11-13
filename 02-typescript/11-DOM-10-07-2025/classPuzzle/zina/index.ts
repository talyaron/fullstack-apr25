import { colors } from "@mui/material";

function updateTitle(newTitle: string) {
    try {
        const title = document.getElementById("title");
        if (!title) throw new Error("Element with id 'title' not found");
        console.log( title);
        title.style.color =  "#9c27b0";
    } catch (error) {
        console.error("Error updating title.color:", error);
    }
}
updateTitle("purple");