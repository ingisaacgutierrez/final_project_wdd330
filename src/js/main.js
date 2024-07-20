import { loadHeaderFooter } from './utils.mjs';
import { checkLogin, getUserData } from './auth.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  loadHeaderFooter();

  const user = await checkLogin();
  if (!user) {
    window.location.href = '../login.html';
    return;
  }

  const latestScore = user.scoreHistory[user.scoreHistory.length - 1]?.score || 'N/A';
  document.getElementById('latest-score').textContent = latestScore;

  const topScores = user.scoreHistory.sort((a, b) => b.score - a.score).slice(0, 3);
  const topScoresList = document.getElementById('top-scores');
  topScores.forEach(score => {
    const li = document.createElement('li');
    li.textContent = `Score: ${score.score} on ${score.date}`;
    topScoresList.appendChild(li);
  });

  const missedQuestions = user.mostMissedQuestions.slice(0, 3);
  const missedQuestionsList = document.getElementById('missed-questions');
  missedQuestions.forEach(question => {
    const li = document.createElement('li');
    li.textContent = question;
    missedQuestionsList.appendChild(li);
  });
});

