import { User } from "../types";



async function registerUser(name: string, email: string, password: string) {
  try {
    const response = await fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "SECRET",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Register failed");

    alert("Registration successful! You can now login.");
    window.location.href = "../login/login.html";
  } catch (error: any) {
    alert(error.message);
  }
}

document.getElementById("registerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;
  registerUser(name, email, password);
});
