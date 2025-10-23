function showPage(pageId: string) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(page => page.classList.remove("active"));
  document.getElementById(pageId)?.classList.add("active");
}


// הפעלת עמוד התחברות בהתחלה
showPage("login-page");

function log(params:string) {
  try {

  } catch (error) {

  }
}
