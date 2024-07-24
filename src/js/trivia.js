import { loadHeaderFooter } from "./utils.mjs";
import { fetchTriviaQuestions } from "./externalservices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  loadHeaderFooter();

  const questions = await fetchTriviaQuestions();
  setupTriviaGame(questions);
});

function setupTriviaGame(questions) {
  let currentQuestionIndex = 0;
  const totalQuestions = questions.length;

  const triviaContainer = document.getElementById("trivia-container");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");

  function displayQuestion(index) {
    const question = questions[index];
    triviaContainer.innerHTML = `
      <div class="question">
        <p>${index + 1}. ${question.question}</p>
        ${[...question.incorrect_answers, question.correct_answer]
          .sort(() => Math.random() - 0.5)
          .map(
            (answer, i) => `
            <div>
              <input type="radio" name="question${index}" id="question${index}answer${i}" value="${answer}">
              <label for="question${index}answer${i}">${answer}</label>
            </div>
          `
          )
          .join("")}
      </div>
    `;
  }

  function handleNextQuestion() {
    const selectedAnswer = document.querySelector(
      `input[name="question${currentQuestionIndex}"]:checked`
    );
    if (selectedAnswer) {
      const isCorrect =
        selectedAnswer.value === questions[currentQuestionIndex].correct_answer;
      selectedAnswer.parentElement.style.color = isCorrect ? "green" : "red";

      if (!isCorrect) {
        saveIncorrectQuestion(questions[currentQuestionIndex]);
      }

      currentQuestionIndex++;
      if (currentQuestionIndex < totalQuestions) {
        displayQuestion(currentQuestionIndex);
      } else {
        nextBtn.style.display = "none";
        submitBtn.style.display = "block";
      }
    }
  }

  function saveIncorrectQuestion(question) {
    let incorrectQuestions = getLocalStorage("incorrectQuestions") || [];
    incorrectQuestions.push(question);
    setLocalStorage("incorrectQuestions", incorrectQuestions);
  }

  displayQuestion(currentQuestionIndex);

  nextBtn.addEventListener("click", handleNextQuestion);
  submitBtn.addEventListener("click", () => {
    const correctAnswers = document
      .querySelectorAll('input[type="radio"]:checked')
      .filter(
        (input) =>
          input.value === questions[currentQuestionIndex].correct_answer
      ).length;
    const incorrectAnswers = totalQuestions - correctAnswers;

    document.getElementById("correct-count").textContent = correctAnswers;
    document.getElementById("incorrect-count").textContent = incorrectAnswers;

    setLocalStorage("correctAnswers", correctAnswers);
    setLocalStorage("incorrectAnswers", incorrectAnswers);

    document.getElementById("result").style.display = "block";

    // Redirect to home after a short delay
    setTimeout(() => {
      window.location.href = "../main_dashboard/home.html";
    }, 3000);
  });

  nextBtn.style.display = "block";
}
