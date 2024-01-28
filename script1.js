setInterval(() => {
    $("#currentYear").html(new Date().toLocaleTimeString());
}, 1000);

// List of valid book titles
const validBookTitles = ["Twilight", "New Moon", "Eclipse", "Breaking Dawn", "Midnight Sun", "Life and death"];

// START - ORDER PAGE
function validateAndSubmit(event) {
    event.preventDefault();

    var isValidated = true;

    //Reset all errors
    $("#fullnamespn").html("");
    $("#emailspn").html("");
    $("#phonespn").html("");
    $("#bookspn").html("");
    $("#descriptionSpn").html("");

    const fullName = $("#fullname").val();
    if (fullName.length < 3) {
        $("#fullnamespn").html("Full name must be min 3 chars");
        isValidated = false;
    }
    
    const email = $("#email").val();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        $("#emailspn").html("This is not a valid email");
        isValidated = false;
    }

    const enteredPhoneNo = $("#phone").val();
    if (!validateEnteredPhoneNo(enteredPhoneNo)) {
        $("#phonespn").html("Invalid phone no");
        isValidated = false;
    }

    const enteredBookTitle = $("#book").val();
    if (!validateBookTitle(enteredBookTitle)) {
        $("#bookspn").html("Invalid book title");
        isValidated = false;
    } else {
        // If the book title is valid, clear the error message
        $("#bookspn").html("");
    }

    const description = $("#description").val();
    if (description.length < 16) {
        $("#descriptionSpn").html("Description must be min 16 chars");
        isValidated = false;
    }

    //Validate input values
    if (isValidated == false) {
        return;
    }

    // Call method
    handleSubmit(fullName, email, enteredPhoneNo, enteredBookTitle, description);
}

// Validate entered phone number function
function validateEnteredPhoneNo(phoneNo) {
    // Validate phone number - starts with +355 and has a total of 12 characters
    var phoneRegex = /^\+355\d{9}$/;
    return phoneRegex.test(phoneNo);
}

// Validate book title function
function validateBookTitle(inputTitle) {
    return validBookTitles.includes(inputTitle);
}

function handleSubmit(_fullName, _email, _phone, _book, _description) {
    // Create Object
    var newOrder = {
        id: Math.floor(Math.random() * 1000),
        fullname: _fullName,
        email: _email,
        phone: _phone,
        book: _book,
        description: _description
    };

    //Request orders data from the api endpoint
    const settings = {
        async: true,
        crossDomain: true,
        url: '../BackEnd/server.php',
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        data: JSON.stringify(newOrder)
    };

    $.ajax(settings).done(function (response) {
        alert('Order added to the database');
        // Assuming you want to show a thank you message or perform other actions here
    });
}

$(document).ready(function () {
    $("#submitBtn").click(validateAndSubmit);
});