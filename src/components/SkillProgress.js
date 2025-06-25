import React from "react";

const SkillProgress = ({ matched, total }) => {
    const percent = Math.round((matched / total) * 100);

    return (
        <div style={{ width: "100%", marginTop: "20px" }}>
            <h4>Resume Skill Match Progress</h4>
            <div style={{
                height: "25px",
                backgroundColor: "#eee",
                borderRadius: "10px",
                overflow: "hidden"
            }}>
                <div style={{
                    width: `${percent}%`,
                    height: "100%",
                    backgroundColor: "#4CAF50",
                    textAlign: "center",
                    color: "white",
                    lineHeight: "25px"
                }}>
                    {percent}%
                </div>
            </div>
        </div>
    );
};

export default SkillProgress;
