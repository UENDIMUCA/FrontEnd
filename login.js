setInterval(() => {
    $("#currentYear").html(new Date().toLocaleTimeString());
}, 1000);


$(document).ready(function () {
    // Add an event listener for form submission
    $("#formLogin").submit(function (event) {
        validateAndSubmit(event);
    });

    // Validation and submission function
    function validateAndSubmit(event) {
        event.preventDefault();
        console.log("Validating and submitting...");

        // Reset the login response message
        $("#loginResponse").html("");

        // Get email and password from the form
        const email = $("input[name='email']").val();
        const password = $("input[name='password']").val();

        // Make AJAX request to check login credentials
        $.ajax({
            type: "POST",
            url: "../BackEnd/login.php",  // Adjust the path based on your project structure
            data: {
                email: email,
                password: password
            },
            success: function (response) {
                // Handle the response from the server
                $("#loginResponse").html(response);

                // Check if login was successful
                if (response.includes("Login successful!")) {
                    // Check if the user is an admin based on the email
                    if (email.includes('@admin.com')) {
                        // Admin found, redirect to orderss.html
                        window.location.href = "http://localhost/FrontEnd/orderss.html";
                    } else {
                        // Regular user found, redirect to orderp.html
                        window.location.href = "http://localhost/FrontEnd/orderp.html";
                    }
                }
            },
            error: function (error) {
                console.log("Error:", error);
                $("#loginResponse").html("An error occurred during login.");
            }
        });
    }
});