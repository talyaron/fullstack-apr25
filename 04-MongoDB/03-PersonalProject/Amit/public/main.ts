async function getCurrentUser() {
  try {
    const response = await fetch("http://localhost:3000/api/user/me", {
      headers: { "x-api-key": "SECRET" },
      credentials: "include",
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

async function setupHeader() {
  const headerActions = document.getElementById("headerActions");
  if (  !headerActions) return;

  const user = await getCurrentUser();

  if (user) {
    headerActions.innerHTML = `
      <span class="header__user">Hi, ${user.name}</span>
      <a href="./add/add.html" class="header__btn">+ Add Fact</a>
      <button id="logoutBtn" class="header__btn header__btn--logout">Logout</button>
    `;

    document.getElementById("logoutBtn")?.addEventListener("click", async () => {
      await fetch("http://localhost:3000/api/user/logout", {
        method: "POST",
        headers: { "x-api-key": "SECRET" },
        credentials: "include",
      });
      window.location.href = "index.html";
    });
  } else {
    if (window.location.href === "http://localhost:3000/public/add/add.html") {
      headerActions.innerHTML = ``;
    } else {
      headerActions.innerHTML = `
        <a href="./login/login.html" class="header__link">Login</a>
        <a href="./register/register.html" class="header__link">Register</a>
      `;
    }
  }
}

setupHeader();
