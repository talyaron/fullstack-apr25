const form = document.getElementById("contact-form") as HTMLFormElement;
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const formData = new FormData(form);
  console.log(formData)
  
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
    subscribe: formData.get("subscribe") === "on" ? true : false,
  };

  

  console.log("Form Data Submitted:", data);
});