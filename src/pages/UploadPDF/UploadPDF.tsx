import React, { useState } from "react";
import "./UploadPDF.css"; 

const UploadPDF: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setUploadStatus(null);
        } else {
            setUploadStatus("Please select a valid PDF file.");
            setFile(null);
        }
    };

    // Handle file upload
    const handleUpload = async () => {
        if (!file) {
            setUploadStatus("No file selected.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/upload-pdf", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert("PDF Uploaded Successfully")
                setUploadStatus(`the Source ID: ${data.sourceId}`);
            } else {
                setUploadStatus(`Error: ${data.detail || "Upload failed."}`);
            }
        } catch (error) {
            console.error("Upload failed:", error);
            setUploadStatus("An error occurred during upload.");
        }
    };

    return (
        <div className="upload-container">
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!file}>Upload PDF</button>
            {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
        </div>
    );
};

export default UploadPDF;