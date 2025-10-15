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
  const headerUser = document.getElementById("headerUser");
  if (!headerActions || !headerUser) return;

  const user = await getCurrentUser();

  if (user) {
    headerUser.innerHTML = `Hi, ${user.name}`;
    headerActions.innerHTML = `
      <a href="./add/add.html" class="facts__add-btn">+ Add Fact</a>
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
    headerUser.innerHTML = ``;
    headerActions.innerHTML = `
      <a href="./login/login.html" class="header__link">Login</a>
      <a href="./register/register.html" class="header__link">Register</a>
    `;
  }
}

setupHeader();