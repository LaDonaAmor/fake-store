document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      errorMessage.textContent = "Please enter username and password";
      errorMessage.style.display = "block";
      return;
    }

    try {
      const user = {
        id: 1,
        username: username,
      };
      // Accept any password (fake login)
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "homepage.html";
    } catch (error) {
      console.error("Login error:", error);
      errorMessage.textContent = "Login failed. Please try again.";
      errorMessage.style.display = "block";
    }
  });
});
