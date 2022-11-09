import api from "./index";

export const login = async (email, password) => {
    const { data } = await api.post('auth/login', { data: JSON.stringify({ email, password }) });
    return data;
}

export const AuthCheck = async (token) => {
    const { data } = await api.post('auth/token', { data: JSON.stringify({ token }) });
    return data;
}