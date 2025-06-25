import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const SkillPieChart = ({ matched, missing }) => {
    const data = [
        { name: "Matched Skills", value: matched.length },
        { name: "Missing Skills", value: missing.length }
    ];

    const COLORS = ["#00C49F", "#FF8042"];

    return (
        <PieChart width={300} height={250}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
            >
                {data.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
            </Pie>
            <Legend />
        </PieChart>
    );
};

export default SkillPieChart;
