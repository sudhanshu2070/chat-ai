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

            handleUpload(networkFile);
        } catch (error) {
            toast.error(`Error fetching PDF: ${error}`, { position: "top-right" });
        }
    };

    // Handle file upload
    const handleUpload = async (selectedFile: File) => {
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
                //const message = `File Uploaded Sccuessfully, the Source ID: ${data.sourceId}`;
                //setUploadStatus(message);
                toast.success(`PDF uploaded successfully! 🎉 Source ID: ${data.sourceId}`, {
                    position: "top-right",
                    autoClose: 3000, // Auto close after 3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light", // Use the light theme
                    style: { backgroundColor: "#e0e0e0", color: "#333" }, // Light grey background with dark text
                });                
            } 
            else {
                const errorMessage = `Error: ${data.detail || "Upload failed."}`;
                setUploadStatus(errorMessage);

                // Showing the error toast
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
            <button onClick={() => file && UploadPDF(file)}  disabled={!file}>Upload PDF</button>
            <button onClick={handleFetchAndUpload}>Fetch & Upload from Network</button>
            {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
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