import { html, define } from "https://unpkg.com/hybrids@^6";
let quizObject;
let userName;

async function fetchQuiz() {
  await fetch("../quiz.json")
    .then((res) => res.json())
    .then((data) => {
      quizObject = data;
    });
}

async function fetchUser() {
  await fetch("../user.json")
    .then((res) => res.json())
    .then((data) => {
      userName = data.name;
    });
}

function startQuiz() {
  window.location.href = "/quiz/question-1.html";
}

await fetchUser();

await fetchQuiz();

const { questions } = quizObject;

const quizLength = questions.length;

console.log(quizObject);
export default define({
  tag: "quiz-welcome-component",
  userName: userName,
  quizLength: quizLength,
  render: ({ userName, quizLength }) => html`
    <div id="main-element">
      <div class="quiz-welcome">
        <p>
          WELCOME ${userName.toUpperCase()} -- PLEASE COMPLETE THIS SKILLS
          ASSESSMENT
        </p>
      </div>
      <div class="quiz-element">
        <div class="quiz-content">
          <p>
            This assesment has ${quizLength} questions which will allow us to
            better evaluate your ability to succeed in the position you've
            applied for. Upon completion, a supervisor will review your answers
            and respond to you with further instruction.
          </p>
        </div>
        <div class="quiz-footer">
          <p>Please click the button below to begin skill assessment</p>
        </div>
        <div class="btn-container">
          <button id="start-btn" class="primary-btn" onclick="${startQuiz}">BEGIN</button>
        </div>
      </div>
    </div>

    <style>
      #main-element {
        margin-top: 8.5rem;
        width: 100vw;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .quiz-element {
        width: 50%;
        height: 35rem;
        padding: 2rem;
        background-color: #f5f5f5;
        border: 2px solid #000;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        text-align: center;
      }

      .quiz-welcome p {
        font-size: 1.5rem;
      }

      .quiz-footer {
        margin-bottom: -4rem;
      }

      .primary-btn {
        color: #f5f5f5;
        font-size: 1.5rem;
        background-color: #097fa3;
        border-radius: 5px;
        border: none;
        width: 150px;
        height: 50px;
      }

      .primary-btn:hover {
        cursor: pointer;
      }

      .primary-btn:active {
        background-color: #066481;
      }

      .secondary-btn {
        color: #097fa3;
        font-size: 1.5rem;
        background-color: #f5f5f5;
        border-radius: 5px;
        border: 2px solid #097fa3;
        width: 150px;
        height: 50px;
      }

      .secondary-btn:hover {
        cursor: pointer;
      }

      .secondary-btn:active {
        background-color: #dbdbdb;
      }
    </style>
    </style>
  `,
});
