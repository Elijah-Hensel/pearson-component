import { html, define, children } from "https://unpkg.com/hybrids@^6";
import QuizWelcome from "./quizWelcome";

define({
  tag: "main-element",
  welcome: children(QuizWelcome),
  render: ({ welcome }) => html`
    <div id="main-element">${welcome}</div>

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
    </style>
  `,
});
