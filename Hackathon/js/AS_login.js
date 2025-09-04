var navLinks = document.getElementById("navLinks");


function showMenu() {
    navLinks.style.right = "0";
}


function hideMenu() {
    navLinks.style.right = "-200px";
}


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");


  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop form from refreshing page


    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();


    try {
      const response = await fetch("/public_html/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, password }),
      });


      // If PHP redirects (successful login), browser follows automatically
      if (response.redirected) {
        window.location.href = response.url;
        return;
      }


      // Otherwise, handle plain text (like "Invalid email or password.")
      const result = await response.text();


      // Display error message
      showError(result);
    } catch (error) {
      console.error("Error logging in:", error);
      showError("Something went wrong. Please try again later.");
    }
  });


  function showError(message) {
    let errorEl = document.querySelector(".login-error");
    if (!errorEl) {
      errorEl = document.createElement("p");
      errorEl.className = "login-error";
      errorEl.style.color = "red";
      document.querySelector(".form-frame").appendChild(errorEl);
    }
    errorEl.textContent = message;
  }
});





