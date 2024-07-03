import { authenticateUser } from './externalservices.mjs';
import { getParam } from './utils.mjs';

export async function login(creds, redirect) {
    try {
        const token = await authenticateUser(creds.email, creds.password);
        localStorage.setItem('authToken', JSON.stringify(token));
        if (redirect) {
            window.location.href = redirect;
        } else {
            window.location.href = '../main_dashboard/home.html';
        }
    } catch (error) {
        alert(error.message);
    }
}

export function isTokenValid() {
    const tokenString = localStorage.getItem('authToken');
    if (!tokenString) return false;

    const token = JSON.parse(tokenString);
    return token.expiry > new Date().getTime();
}

export function checkLogin() {
    const redirect = getParam('redirect');
    if (!isTokenValid()) {
        const currentUrl = window.location.href;
        if (!currentUrl.includes('login/index.html')) {
            window.location.href = `../login/index.html${redirect ? `?redirect=${redirect}` : ''}`;
        }
    }
}

export function getUserData() {
    const tokenString = localStorage.getItem('authToken');
    if (!tokenString) return null;

    const token = JSON.parse(tokenString);
    return token.user;
}