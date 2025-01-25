const validateUser = async (email) => {
  try {
    const result = await fetch("");
    const user = await result.json();
    return user;
  } catch (error) {
    return { error };
  }
};

const onclicklogin = async () => {
  const email = document.getElementById("input-email").value;

  if (email.length < 5 || !email.includes("@")) {
    alert("Invalid email");
    return;
  }

  console.log(email);

  try {
    const result = await validateUser(email);
    console.log(result);

    if (result.error) {
      alert("Fail to validate email");
      return;
    }

    const { name, id } = result;
    if (!name || !id) {
      alert("Failed to retrieve user details");
      return;
    }

    localStorage.setItem("userEmail", email);
    localStorage.setItem("username", name);
    localStorage.setItem("userid", id);

    window.location.href = "./src/pages/home/index.html";
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    alert("An error occurred during login. Please try again.");
  }
};
