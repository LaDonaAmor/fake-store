document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const textInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const text = textInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            errorMessage.textContent = "Please enter username and password";
            errorMessage.style.display = "block";

            return;
        }

        try {
            const response = await fetch("https://fakestoreapi.com/users");
            const users = await response.json();

            let user = users.find ((user) => user.username === username);

            if (!user) {
                user = {
                    id: Date.now(),
                    username: username,
                    password: password
                };
            } else {
                if (user.password !== password) {
                    errorMessage.textContent = "Incorrect password!";
                    errorMessage.style.display = "block";

                    return;
                }
            }

            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = "homepage.html";
        } catch (error) {
            console.error("Login error:", error);
            errorMessage.textContent = "Login failed. Please try again.";
            errorMessage.style.display = "block";
        }
    });
});