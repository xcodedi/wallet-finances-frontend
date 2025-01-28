const BASE_API_URL = "https://mp-wallet-app-api.herokuapp.com"; // Centralizes the API URL

// Function to perform the POST request to the API and register the user
const onCallRegister = async (email, name) => {
  try {
    const response = await fetch(`${BASE_API_URL}/users`, {
      method: "POST", // HTTP method to send data to the server
      mode: "cors", // Specifies the mode for cross-origin requests
      headers: {
        "Content-Type": "application/json", // Indicates that the request body is JSON
      },
      body: JSON.stringify({ email, name }), // Converts the data to JSON format before sending
    });

    if (!response.ok) {
      // If the response status is not OK (i.e., error occurred)
      throw new Error(
        `API Error: ${response.status} - ${response.statusText}` // Throw error with status and message
      );
    }

    const data = await response.json(); // Converts the response body to JSON format
    console.log("User registered successfully:", data); // Logs the successful registration data
    return data; // Returns the registered user's data
  } catch (error) {
    console.error("Error during registration:", error.message); // Logs the error message
    return { error: error.message }; // Returns the error for further handling
  }
};

// Function to handle the registration form submission event
const onRegister = async () => {
  const email = document.getElementById("input-email").value; // Gets the email input value
  const name = document.getElementById("input-name").value; // Gets the name input value

  // Input validations
  if (name.length < 3) {
    // If the name is too short (less than 3 characters)
    alert("Name must be more than 3 characters."); // Alert the user
    return;
  }

  if (email.length < 5 || !email.includes("@")) {
    // If the email is invalid (less than 5 characters or missing '@')
    alert("Invalid email!"); // Alert the user
    return;
  }

  // Calls the onCallRegister function and handles the result
  const result = await onCallRegister(email, name);

  if (result.error) {
    // If an error occurs during registration
    alert("Failed to register the user. Please try again."); // Alert the user
    return;
  }

  // Save the registered user data in the localStorage
  localStorage.setItem("userEmail", result.email); // Save email in localStorage
  localStorage.setItem("userName", result.name); // Save name in localStorage
  localStorage.setItem("userId", result.id); // Save user ID in localStorage

  // Redirect to the home page
  alert("Registration successful!"); // Alert the user of successful registration
  window.open("../home/index.html", "_self"); // Redirects to the home page
};

// Set up the event for the form when the page loads
window.onload = () => {
  const form = document.getElementById("form-register"); // Gets the form element by ID
  form.onsubmit = (event) => {
    // Set up the form submission handler
    event.preventDefault(); // Prevent the default form submission behavior
    onRegister(); // Call the onRegister function when the form is submitted
  };
};
