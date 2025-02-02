// Function to validate the user by email
const validateUser = async (email) => {
  try {
    // Fetch user data from the server (URL is missing and needs to be added)
    const result = await fetch("");
    // Parse the response as JSON
    const user = await result.json();
    // Return the user data
    return user;
  } catch (error) {
    // Return an error object if the fetch fails
    return { error };
  }
};

// Function to handle login button click
const onclicklogin = async () => {
  // Get the email value from the input field
  const email = document.getElementById("input-email").value;

  // Validate the email format
  if (email.length < 5 || !email.includes("@")) {
    // Alert the user if the email is invalid
    alert("Invalid email");
    return;
  }

  // Log the email to the console
  console.log(email);

  try {
    // Validate the user with the provided email
    const result = await validateUser(email);
    // Log the result to the console
    console.log(result);

    // Check if there was an error in validation
    if (result.error) {
      // Alert the user if validation failed
      alert("Fail to validate email");
      return;
    }

    // Destructure the name and id from the result
    const { name, id } = result;
    // Check if name or id is missing
    if (!name || !id) {
      // Alert the user if user details are missing
      alert("Failed to retrieve user details");
      return;
    }

    // Store user details in localStorage
    localStorage.setItem("userEmail", email);
    localStorage.setItem("username", name);
    localStorage.setItem("userid", id);

    // Redirect the user to the home page
    window.location.href = "./src/pages/home/index.html";
  } catch (error) {
    // Log any unexpected errors to the console
    console.error("An unexpected error occurred:", error);
    // Alert the user if an error occurred during login
    alert("An error occurred during login. Please try again.");
  }
};
