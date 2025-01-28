window.onload = () => {
  // Retrieve data from localStorage
  const email = localStorage.getItem("userEmail");
  const name = localStorage.getItem("username");

  // Log the retrieved data to the console
  console.log(email);
  console.log(name);

  // DOM elements
  const navigationUserInfo = document.getElementById("user-bar");
  const navigationUserLogo = document.getElementById("user-logo");

  // Update the email in the correct element
  const emailElement = document.getElementById("user-email");
  emailElement.textContent = email;

  // Create an element to display the user's name
  const nameElement = document.createElement("h3");
  const nameText = document.createTextNode(name ? name.charAt(0) : "N");
  nameElement.appendChild(nameText);
  navigationUserLogo.appendChild(nameElement);

  // Configure the logout link
  const logoutElement = document.getElementById("logout-link");
  logoutElement.addEventListener("click", () => {
    localStorage.clear(); // Clear the localStorage data
    alert("You have successfully logged out!");
    window.location.href = "/login.html"; // Redirect to the login page
  });
};
