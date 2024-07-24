import { loadHeaderFooter } from './utils.mjs';
import { fetchTriviaQuestions } from './externalservices.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  loadHeaderFooter();

  const questions = await fetchTriviaQuestions();
  displayQuestions(questions);

  document.getElementById('reload-btn').addEventListener('click', async () => {
    const newQuestions = await fetchTriviaQuestions();
    displayQuestions(newQuestions);
  });
});

function displayQuestions(questions) {
  const container = document.getElementById('questionary-container');
  container.innerHTML = questions.map((question, index) => `
    <div class="question">
      <p>${index + 1}. ${question.question}</p>
      <p>Correct Answer: ${question.correct_answer}</p>
    </div>
  `).join('');
}
