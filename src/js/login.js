import { login, checkLogin } from './auth.mjs';
import { getParam } from './utils.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const redirect = getParam('redirect');

    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const creds = { email, password };
        await login(creds, redirect);
    });

    const currentUrl = window.location.href;
    if (!currentUrl.includes('login/index.html')) {
        checkLogin();
    }
});
