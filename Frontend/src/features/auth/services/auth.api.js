import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
    withCredentials: true,
    timeout: 30000,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export async function register({ username, email, password }) {
    try {
        const response = await api.post("/auth/register", {
            username,
            email,
            password,
        });
        if (response.data?.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;

    } catch (error) {
        console.error("Error registering user", error);
        throw error;
    }

}

export async function login({ email, password }) {
    try {
        const response = await api.post("/auth/login", {
            email,
            password,
        });
        if (response.data?.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error("Error logging in", error);
        throw error;
    }

}

export async function logout() {
    try {
        const response = await api.get("/auth/logout");
        localStorage.removeItem("token");
        return response.data;
    } catch (error) {
        localStorage.removeItem("token");
        console.error("Error logging out", error);
        throw error;
    }

}

export async function getMe() {
    try {
        const response = await api.get("/auth/get-me");
        return response.data;
    } catch (error) {
        console.error("Error getting me", error);
        throw error;
    }

}

//these 4 functions interact with backend