import { checkLogin, getUserData } from './auth.mjs';

document.addEventListener('DOMContentLoaded', () => {
    checkLogin();
    
    const user = getUserData();
    if (user) {
        document.getElementById('last-score').innerText = user.lastScore;
        
        const topScores = document.getElementById('top-scores');
        user.topScores.forEach(score => {
            const li = document.createElement('li');
            li.innerText = score;
            topScores.appendChild(li);
        });

        const topMissedQuestions = document.getElementById('top-missed-questions');
        user.topMissedQuestions.forEach(question => {
            const li = document.createElement('li');
            li.innerText = question;
            topMissedQuestions.appendChild(li);
        });
    }
});
