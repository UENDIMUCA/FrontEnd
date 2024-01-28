setInterval(() => {
    $("#currentYear").html(new Date().toLocaleTimeString());
}, 1000);


("#formOrder").submit(function (event) {
    validateAndSubmit(event);
});

// Validation and submission function
function validateAndSubmit(event) {
    event.preventDefault();
    console.log("Validating and submitting...");

    var isValidated = true;

    // Reset all errors
    $("#usernamespn").html("");
    $("#emailspn").html("");
    $("#passwordspn").html("");

    const username = $("input[name='username']").val();
    if (username.length < 3) {
        $("#usernamespn").html("Username must be at least 3 characters");
        isValidated = false;
    }

    const email = $("#email").val();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        $("#emailspn").html("This is not a valid email");
        isValidated = false;
    }


    const password = $("input[name='password']").val();
    if (password.length < 6) {
        $("#passwordspn").html("Password must be at least 6 characters");
        isValidated = false;
    }

    // Validate input values
    if (!isValidated) {
        return;
    }

    // Call method to handle registration
    handleRegistration(username, email, password);
}
function handleRegistration(username, email, password) {
    // Make AJAX request
    $.ajax({
        type: "POST",
        url: "../BackEnd/registration.php",  // Replace with the actual path to your PHP file
        data: {
            id: Math.floor(Math.random() * 1000),
            username: username,
            email: email,
            password: password
        },
        success: function (response) {
          

            // Check if the registration was successful
            if (response.includes("successful")) {
                // Redirect to login.html after a short delay (e.g., 2 seconds)
                setTimeout(function () {
                    window.location.href = "login.html";  // Corrected line
                }, 2000);
            }
        },
        error: function (error) {
            console.log("Error:", error);
            $("#responseMessage").html("An error occurred during registration.");
        }
    });
}
