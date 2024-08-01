import { jwtDecode } from "jwt-decode";

const getUserRoles = () => {
    const token = localStorage.getItem('user');
    if (!token) return [];

    const decodedToken = jwtDecode(token);
    console.log("Logged in user's username", decodedToken.sub); 
    return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || [];
};

export const hasRole = (role) => {
    const roles = getUserRoles();
    return roles.includes(role);
};

export const isLoggedIn = () => {
    const token = localStorage.getItem('user'); // or wherever you store the token
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        // Check if token is expired
        return decodedToken.exp > currentTime;
    } catch (error) {
        return false;
    }
};