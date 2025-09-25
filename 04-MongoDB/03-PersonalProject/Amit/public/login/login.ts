import { User } from "../types";



async function loginUser(email: string, password: string) {
  try {
    const response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "SECRET",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");

    localStorage.setItem("userId", data.userId);
    localStorage.setItem("userName", data.name);

    alert("Login successful!");
    window.location.href = "../index.html";
  } catch (error: any) {
    alert(error.message);
  }
}

document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;
  loginUser(email, password);
});
