import React from "react";

const DownloadButton = ({ data }) => {
    const handleDownload = () => {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "career_report.json";
        link.click();
    };

    return (
        <button onClick={handleDownload} style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
        }}>
            ⬇️ Download Report (JSON)
        </button>
    );
};

export default DownloadButton;
