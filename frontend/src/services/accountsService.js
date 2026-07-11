import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/expense-tracker",
    withCredentials: true,
})

export const getAccounts = async () => {
    const result = await api.get("/accounts")
    return result.data;
}

export const createAccount = async (userData) => {
    const result = await api.post("/accounts/", userData)
    return result.data;
}

export const editAccount = async (accountId, userData) => {
    const result = await api.put(`/accounts/${accountId}`, userData)
    return result.data;
}

export const deleteAccount = async (accountId) => {
    const result = await api.delete(`/accounts/${accountId}`);
    return result.data;
};
export const getAccount = async (id) => {
    const result = await api.get(`/accounts/${id}`);
    return result.data;
};