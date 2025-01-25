const onclicklogin = () => {
  const email = document.getElementById("input-email").value;
  if (email.length < 5 || !email.includes("@")) {
    alert("Invalid email");
    return;
  }
  console.log(email);
  localStorage.setItem("userEmail", email);

  window.location.href = "./src/pages/home/index.html";
};
