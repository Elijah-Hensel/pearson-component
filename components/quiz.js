import { html, define, dispatch } from "https://unpkg.com/hybrids@^6";

// const quizFooter = document.getElementById("quiz-footer");
let correctAnswer;

let quizObject;
let userName;
let url = window.location.href;
let pageNum = url.split("/").pop().substring(9, 10);
let quizQuestion = pageNum - 1;
let response;

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
await fetchUser();
await fetchQuiz();

const { questions } = quizObject;

const quizLength = questions.length;

let currentQuestion = quizObject.questions[quizQuestion];

function correctAnswerChecked() {
  if (correctAnswer.checked) {
    return true;
  }
  return false;
}

function whichAnswerCheck() {
  let radios = document.getElementsByName("response");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) response = radios[i].value;
  }
}

function addResponseToUser() {}

function onSubmitBtn(host) {
  console.log("clicked");
  // replaceSubmit();
  let correctAnswer = document.querySelector("quiz-component").input;
  host.helperText = correctAnswer.checked ? "Congrats" : "Bad Job";
  host.buttonContent = "NEXT";
  host.buttonId = "next-btn";

  // Trigger not bubbling `custom-change` custom event
  dispatch(host, "custom-change", { detail: host.buttonContent });
  dispatch(host, "custom-change", { detail: host.buttonId });
  dispatch(host, "custom-change", { detail: host.helperText });
}
// window.location.href = `question-${++pageNum}.html`;

define({
  tag: "quiz-component",
  userName: userName,
  quizLength: quizLength,
  question: currentQuestion.question,
  answers: currentQuestion.answers,
  helperText: "Please click the button below to submit your answer",
  buttonId: "submit-btn",
  buttonContent: "SUBMIT",
  composed: true,
  render: ({ question, answers, buttonId, buttonContent, helperText }) => html`
    <div id="main-element">
      <div class="quiz-welcome">
        <p id="question-num">Question ${pageNum}/4</p>
      </div>
      <div class="quiz-element">
        <div class="quiz-content">
          <h3 id="question-content">${question}</h3>
          <p id="question-subtext">
            Please choose the option that is most accurate
          </p>
        </div>
        <div id="quiz-answers">
          ${answers.map(
            ({ id, response, isCorrect }) => html`<input
                class="response"
                type="radio"
                id="response${id}"
                name="response"
                value="${response}"
                correct="${isCorrect}"
              />
              <label for="${id}"> ${response}</label><br />`
          )}
        </div>
        <div id="quiz-footer" class="quiz-footer">
          <p>${helperText}</p>
        </div>
        <div id="btn-container" class="btn-container">
          <button id="${buttonId}" class="primary-btn" onclick="${onSubmitBtn}">
            ${buttonContent}
          </button>
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
  `,
});
