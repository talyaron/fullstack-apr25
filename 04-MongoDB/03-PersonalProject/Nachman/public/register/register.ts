// Create new user account
async function createUserAccount(fullName: string, emailAddress: string, userPassword: string): Promise<void> {
  try {
    const signupRequest = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer KNOWLEDGESHARE2025",
      },
      body: JSON.stringify({ 
        name: fullName, 
        email: emailAddress, 
        password: userPassword 
      }),
      credentials: "include",
    });

    const result = await signupRequest.json();
    if (!signupRequest.ok) throw new Error(result.message || "Registration failed");

    alert("🎉 Welcome to KnowledgeShare!");
    window.location.href = "../index.html";
  } catch (error: any) {
    console.error("Registration error:", error);
    alert(error.message);
  }
}

// Form submission handler
document.getElementById("signupForm")?.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const userName = (document.getElementById("fullName") as HTMLInputElement).value;
  const userEmail = (document.getElementById("email") as HTMLInputElement).value;
  const userPass = (document.getElementById("password") as HTMLInputElement).value;
  createUserAccount(userName, userEmail, userPass);
});