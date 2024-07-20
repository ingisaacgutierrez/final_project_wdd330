import { login } from './auth.mjs';
import { loadHeaderFooter } from './utils.mjs';

document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();

  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const result = await login(email, password);
    if (result.success) {
      window.location.href = './main_dashboard/home.html';
    } else {
      document.getElementById('login-error').textContent = result.message;
      document.getElementById('login-error').style.display = 'block';
    }
  });
});


