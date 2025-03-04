import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

    // Fetch PDF from the network and upload
    const handleFetchAndUpload = async () => {
        try {
            const response = await fetch("http://localhost:8080/get-pdf");
            if (!response.ok) throw new Error("Failed to fetch PDF");

            const blob = await response.blob();
            const networkFile = new File([blob], "network-file.pdf", { type: "application/pdf" });

            setFile(networkFile);
            await handleUpload(networkFile); // Upload after fetching
        } catch (error) {
            toast.error(`Error fetching PDF: ${error}`, { position: "top-right" });
        }
    };

    // Handle file upload
    const handleUpload = async (selectedFile: File) => {
        if (!selectedFile) {
            setUploadStatus("No file selected.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/upload-pdf", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`PDF uploaded successfully! 🎉 Source ID: ${data.sourceId}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    style: { backgroundColor: "#e0e0e0", color: "#333" },
                });
            } else {
                const errorMessage = `Error: ${data.detail || "Upload failed."}`;
                setUploadStatus(errorMessage);
                toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
            }
        } catch (error) {
            console.error("Upload failed:", error);
            setUploadStatus("An error occurred during upload.");
            toast.error("An error occurred during upload.", { position: "top-right", autoClose: 3000 });
        }
    };

    return (
        <div className="upload-container">
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={() => file && handleUpload(file)} disabled={!file}>
                Upload PDF
            </button>
            <button onClick={handleFetchAndUpload}>Fetch & Upload from Network</button>
            {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default UploadPDF;