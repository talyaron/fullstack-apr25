// User signin function
async function authenticateUser(emailAddress: string, userPassword: string): Promise<void> {
  try {
    const loginRequest = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer KNOWLEDGESHARE2025",
      },
      body: JSON.stringify({ 
        email: emailAddress, 
        password: userPassword 
      }),
      credentials: "include",
    });

    const result = await loginRequest.json();
    if (!loginRequest.ok) throw new Error(result.message || "Login failed");

    alert("🎉 Welcome back to KnowledgeShare!");
    window.location.href = "../index.html";
  } catch (error: any) {
    console.error("Login error:", error);
    alert(error.message);
  }
}

// Form submission handler
document.getElementById("signinForm")?.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;
  authenticateUser(email, password);
});