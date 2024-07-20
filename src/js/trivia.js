import { checkLogin, getUserData } from './auth.mjs';
import { loadHeaderFooter } from './utils.mjs';
import { fetchTriviaQuestions } from './externalservices.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  loadHeaderFooter();
  
  const user = await checkLogin(); 
  if (!user) {
    window.location.href = '../login.html';
    return;
  }

  const questions = await fetchTriviaQuestions();
  displayQuestions(questions);
});

async function displayQuestions(questions) {
  const triviaContainer = document.getElementById('trivia-container');
  questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
      <p>${index + 1}. ${question.question}</p>
      ${question.incorrect_answers.map((answer, i) => `
        <div>
          <input type="radio" name="question${index}" id="question${index}answer${i}" value="${answer}">
          <label for="question${index}answer${i}">${answer}</label>
        </div>
      `).join('')}
      <div>
        <input type="radio" name="question${index}" id="question${index}correct" value="${question.correct_answer}">
        <label for="question${index}correct">${question.correct_answer}</label>
      </div>
    `;
    triviaContainer.appendChild(questionElement);
  });

  const submitBtn = document.getElementById('submit-btn');
  submitBtn.style.display = 'block';
  submitBtn.addEventListener('click', () => submitAnswers(questions));
}

function submitAnswers(questions) {
  const results = questions.map((question, index) => {
    const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
    const isCorrect = selectedAnswer && selectedAnswer.value === question.correct_answer;
    if (selectedAnswer) {
      selectedAnswer.parentElement.style.color = isCorrect ? 'green' : 'red';
    }
    return isCorrect;
  });

  const correctCount = results.filter(isCorrect => isCorrect).length;
  const incorrectCount = results.length - correctCount;

  document.getElementById('correct-count').textContent = correctCount;
  document.getElementById('incorrect-count').textContent = incorrectCount;

  document.getElementById('result').style.display = 'block';
  

  saveUserResults(correctCount, incorrectCount);
}

async function saveUserResults(correctCount, incorrectCount) {
  const user = await getUserData();

}

