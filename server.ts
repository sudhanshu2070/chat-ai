import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 8080;

// Enable CORS for frontend requests
app.use(cors());

// Define the network PDF file path
const pdfFilePath = "\\\\192.168.0.2\\AIMation_Hack\\Automation Geeks\\Document\\Sample_FAQs Document_AImation.pdf";

// Endpoint to read PDF from network drive and send it as a file response
app.get("/get-pdf", (req, res) => {
    console.log("API Called");
    fs.readFile(pdfFilePath, (err, data) => {
        if (err) {
            console.error("Error reading PDF:", err);
            return res.status(500).json({ error: "Failed to read the PDF file" });
        }
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="${path.basename(pdfFilePath)}"`);
        res.send(data);
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));