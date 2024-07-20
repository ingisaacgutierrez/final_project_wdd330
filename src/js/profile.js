// profile.js
import { loadHeaderFooter } from './utils.mjs';
import { checkLogin, getUserData, logout } from './auth.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  loadHeaderFooter();

  const user = await checkLogin();
  if (!user) {
    window.location.href = '../login.html';
    return;
  }

  document.getElementById('username').textContent = user.username;
  document.getElementById('email').textContent = user.email;

  const scoreHistoryList = document.getElementById('score-history');
  user.scoreHistory.forEach(score => {
    const li = document.createElement('li');
    li.textContent = `Score: ${score.score} on ${score.date}`;
    scoreHistoryList.appendChild(li);
  });

  document.getElementById('logout').addEventListener('click', () => {
    logout();
    window.location.href = '../login.html';
  });
});