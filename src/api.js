import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const uploadResume = async (file, role) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("role", role);

    try {
        const response = await axios.post(`${BASE_URL}/upload_resume`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (err) {
        console.error("❌ Resume Upload Error:", err.response?.data || err);
        throw err;
    }
};

export const predictDomain = async (skills) => {
    try {
        const response = await axios.post(`${BASE_URL}/predict`, {
            skills: skills
        });
        return response.data;
    } catch (err) {
        console.error("❌ Prediction Error:", err.response?.data || err);
        throw err;
    }
};
