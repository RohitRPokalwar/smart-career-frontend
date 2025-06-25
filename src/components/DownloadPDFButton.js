import React from "react";
import jsPDF from "jspdf";

const DownloadPDFButton = ({ data }) => {
    const handleDownload = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Smart Career Advisor Report", 20, 20);

        doc.setFontSize(12);
        doc.text(`🎯 Role: ${data.role}`, 20, 35);

        doc.text("✅ Matched Skills:", 20, 50);
        data.skills_matched.forEach((skill, i) => {
            doc.text(`• ${skill}`, 30, 60 + i * 7);
        });

        const missingStartY = 60 + data.skills_matched.length * 7 + 10;
        doc.text("❌ Missing Skills:", 20, missingStartY);
        data.skills_missing.forEach((skill, i) => {
            doc.text(`• ${skill}`, 30, missingStartY + 10 + i * 7);
        });

        const linksStartY = missingStartY + 10 + data.skills_missing.length * 7 + 10;
        doc.text("📚 Resources:", 20, linksStartY);
        data.resources.forEach((link, i) => {
            doc.text(`- ${link}`, 30, linksStartY + 10 + i * 7);
        });

        doc.save("career_report.pdf");
    };

    return (
        <button onClick={handleDownload} style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
        }}>
            🖨️ Download PDF Report
        </button>
    );
};

export default DownloadPDFButton;
