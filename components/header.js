import { html, define } from "https://unpkg.com/hybrids@^6";
let userInitials;
async function fetchUser() {
  await fetch("../user.json")
    .then((res) => res.json())
    .then((data) => {
      userInitials = data.initials;
    });
}
await fetchUser();

define({
  tag: "header-component",
  initials: userInitials,
  render: ({ initials }) => html`
    <div id="header-component">
      <img
        src="https://ux.pearson.com/web-components/img/white-full-logo.png"
      />
      <div class="user-nav">
        <div class="user-avatar">
          <p class="user-init">${initials}</p>
        </div>
      </div>
    </div>
    <style>
      #header-component {
        box-sizing: border-box;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #f5f5f5;
        height: 80px;
        width: 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
      }
      img {
        height: 100%;
      }

      .user-avatar {
        height: 50px;
        width: 50px;
        border: 2px solid black;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .user-avatar:hover {
        background-color: #000;
        color: #f5f5f5;
        cursor: pointer;
      }

      .user-init {
        font-size: 2rem;
      }
    </style>
  `,
});
