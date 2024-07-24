import { login } from "./auth.mjs";
import { setLocalStorage } from "./utils.mjs";

document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const result = await login(email, password);

    if (result.success) {
      setLocalStorage("user", result.user);
      window.location.href = "../main_Dashboard/home.html";
    } else {
      alert("Login failed. Please check your credentials.");
    }
  });
