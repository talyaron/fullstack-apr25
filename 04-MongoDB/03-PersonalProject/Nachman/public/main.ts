// Fetch current user profile
async function fetchCurrentUser(): Promise<any> {
  try {
    const userResponse = await fetch("http://localhost:3000/api/user/profile", {
      headers: { 
        "Authorization": "Bearer KNOWLEDGESHARE2025",
        "Content-Type": "application/json"
      },
      credentials: "include",
    });
    if (!userResponse.ok) return null;
    return await userResponse.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// Setup dynamic header navigation
async function initializeHeader(): Promise<void> {
  const headerActions = document.getElementById("headerActions");
  if (!headerActions) return;

  const currentUser = await fetchCurrentUser();

  if (currentUser) {
    // User is logged in - show user menu
    headerActions.innerHTML = `
      <span class="header__username">Welcome, ${currentUser.name}</span>
      <a href="./add/add.html" class="header__button">+ Share Discovery</a>
      <button id="signoutBtn" class="header__button header__button--danger">Sign Out</button>
    `;

    // Handle logout functionality
    const signoutButton = document.getElementById("signoutBtn");
    signoutButton?.addEventListener("click", async () => {
      try {
        await fetch("http://localhost:3000/api/auth/signout", {
          method: "POST",
          headers: { 
            "Authorization": "Bearer KNOWLEDGESHARE2025",
            "Content-Type": "application/json"
          },
          credentials: "include",
        });
        window.location.href = "index.html";
      } catch (error) {
        console.error("Signout error:", error);
        alert("Error signing out. Please try again.");
      }
    });
  } else {
    // User not logged in - show auth links
    const currentPath = window.location.pathname;
    
    if (currentPath.includes("/add/add.html")) {
      // Hide navigation on add page for guests
      headerActions.innerHTML = ``;
    } else {
      // Show login/register links
      headerActions.innerHTML = `
        <a href="./login/login.html" class="header__nav-link">Sign In</a>
        <a href="./register/register.html" class="header__nav-link">Join Now</a>
      `;
    }
  }
}

// Initialize header when page loads
initializeHeader();