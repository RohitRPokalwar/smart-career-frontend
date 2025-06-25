import React from "react";
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from "recharts";

const SkillRadarChart = ({ matched, missing }) => {
    const data = [];

    matched.forEach(skill => {
        data.push({ skill, level: 80 }); // Assume 80% confidence for matched
    });

    missing.forEach(skill => {
        data.push({ skill, level: 20 }); // Assume 20% for missing
    });

    return (
        <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Skills" dataKey="level" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default SkillRadarChart;
