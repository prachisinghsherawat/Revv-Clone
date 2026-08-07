import { currentUser, logout } from "../js/auth.js";

// The logo used to be hotlinked from revv.co.in, which now 404s and left a
// broken image on every page. It ships with the site instead.
function navbar() {
  const user = currentUser();

  const account = user
    ? `<div class="fbo">
        <span class="nav_user">Hi, ${user.name || user.username}</span>
        <a href="#" id="logout_link">Logout</a>
      </div>`
    : `<div class="fbo">
        <a href="login.html">Login/</a> <a href="signup.html"> Signup</a>
      </div>`;

  // Wired up after the caller drops this markup into the page.
  queueMicrotask(() => {
    const link = document.querySelector("#logout_link");
    if (!link) return;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      logout();
      window.location.reload();
    });
  });

  return ` <div class="navbar">
  <div>
    <a href="index.html">
      <img
        class="nav_logo"
        src="./images/revv-logo.svg"
        alt="Revv"
      />
    </a>
  </div>
  <div class="rnav">
    <div class="fbod">Hyundai- <span>subscription</span></div>
    <div class="fbod">Mahindra- <span>subscription</span></div>
    <div class="fbo"><a href="faq.html">FAQs</a></div>
    ${account}
  </div>
</div>`;
}

export default navbar;
