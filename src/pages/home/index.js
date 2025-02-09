const onLogout = () => {
  localStorage.clear();
  window.open("../../../index.html", "_self");
};

const onDeleteItem = async (id) => {
  try {
    const email = localStorage.getItem("userEmail");

    await fetch(`https:/${id}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        email: email,
      },
    });
    onLoadFinancesData();
  } catch (error) {
    alert("Error ao deletar o item.");
  }
};

const renderFinancesList = (data) => {
  const table = document.getElementById("finances-table");
  table.innerHTML = "";

  const tableHeader = document.createElement("tr");

  const titleText = document.createTextNode("Título");
  const titleElement = document.createElement("th");
  titleElement.appendChild(titleText);
  tableHeader.appendChild(titleElement);

  const categoryText = document.createTextNode("Categoria");
  const categoryElement = document.createElement("th");
  categoryElement.appendChild(categoryText);
  tableHeader.appendChild(categoryElement);

  const dateText = document.createTextNode("Data");
  const dateElement = document.createElement("th");
  dateElement.appendChild(dateText);
  tableHeader.appendChild(dateElement);

  const valueText = document.createTextNode("Valor");
  const valueElement = document.createElement("th");
  valueElement.className = "center";
  valueElement.appendChild(valueText);
  tableHeader.appendChild(valueElement);

  const actionText = document.createTextNode("Ação");
  const actionElement = document.createElement("th");
  actionElement.className = "right";
  actionElement.appendChild(actionText);
  tableHeader.appendChild(actionElement);

  table.appendChild(tableHeader);

  data.map((item) => {
    const tableRow = document.createElement("tr");

    // title
    const titleTd = document.createElement("td");
    const titleText = document.createTextNode(item.title);
    titleTd.appendChild(titleText);
    tableRow.appendChild(titleTd);

    // category
    const categoryTd = document.createElement("td");
    const categoryText = document.createTextNode(item.name);
    categoryTd.appendChild(categoryText);
    tableRow.appendChild(categoryTd);

    // category
    const dateTd = document.createElement("td");
    const dateText = document.createTextNode(
      new Date(item.date).toLocaleDateString()
    );
    dateTd.appendChild(dateText);
    tableRow.appendChild(dateTd);

    // value
    const valueTd = document.createElement("td");
    valueTd.className = "center";
    const valueText = document.createTextNode(
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(item.value)
    );
    valueTd.appendChild(valueText);
    tableRow.appendChild(valueTd);

    // delete
    const deleteTd = document.createElement("td");
    deleteTd.style.cursor = "pointer";
    deleteTd.onclick = () => onDeleteItem(item.id);
    deleteTd.className = "right";
    const deleteText = document.createTextNode("Deletar");
    deleteTd.appendChild(deleteText);
    tableRow.appendChild(deleteTd);

    // table add tablerow
    table.appendChild(tableRow);
  });
};

const renderFinanceElements = (data) => {
  const totalItems = data.length;
  const revenues = data
    .filter((item) => Number(item.value) > 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const expenses = data
    .filter((item) => Number(item.value) < 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const totalValue = revenues + expenses;

  // render total items
  const financeCard1 = document.getElementById("finance-card-1");
  financeCard1.innerHTML = "";

  const totalSubtext = document.createTextNode("Total de lançamentos");
  const totalSubTextElement = document.createElement("h3");
  totalSubTextElement.appendChild(totalSubtext);
  financeCard1.appendChild(totalSubTextElement);

  const totalText = document.createTextNode(totalItems);
  const totalElement = document.createElement("h1");
  totalElement.id = "total-element";
  totalElement.className = "mt-smaller";
  totalElement.appendChild(totalText);
  financeCard1.appendChild(totalElement);

  // render revenue
  const financeCard2 = document.getElementById("finance-card-2");
  financeCard2.innerHTML = "";

  const revenueSubtext = document.createTextNode("Receitas");
  const revenueSubtextElement = document.createElement("h3");
  revenueSubtextElement.appendChild(revenueSubtext);
  financeCard2.appendChild(revenueSubtextElement);

  const revenueText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(revenues)
  );
  const revenueTextElement = document.createElement("h1");
  revenueTextElement.id = "revenue-element";
  revenueTextElement.className = "mt smaller";
  revenueTextElement.appendChild(revenueText);
  financeCard2.appendChild(revenueTextElement);

  // render expenses
  const financeCard3 = document.getElementById("finance-card-3");
  financeCard3.innerHTML = "";

  const expensesSubtext = document.createTextNode("Despesas");
  const expensesSubtextElement = document.createElement("h3");
  expensesSubtextElement.appendChild(expensesSubtext);
  financeCard3.appendChild(expensesSubtextElement);

  const expensesText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(expenses)
  );
  const expensesTextElement = document.createElement("h1");
  expensesTextElement.id = "expenses-element";
  expensesTextElement.className = "mt smaller";
  expensesTextElement.appendChild(expensesText);
  financeCard3.appendChild(expensesTextElement);

  // render balance
  const financeCard4 = document.getElementById("finance-card-4");
  financeCard4.innerHTML = "";

  const balanceSubtext = document.createTextNode("Balanço");
  const balanceSubtextElement = document.createElement("h3");
  balanceSubtextElement.appendChild(balanceSubtext);
  financeCard4.appendChild(balanceSubtextElement);

  // Create a text node for the balance, formatted as currency
  const balanceText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalValue)
  );

  // Create an h1 element for the balance text
  const balanceTextElement = document.createElement("h1");
  // Set the id for the balance element
  balanceTextElement.id = "balance-element";
  // Set the class name for styling
  balanceTextElement.className = "mt smaller";
  // Set the color style for the balance text
  balanceTextElement.style.color = "#5936CD";
  // Append the balance text to the h1 element
  balanceTextElement.appendChild(balanceText);
  // Append the balance element to the finance card
  financeCard4.appendChild(balanceTextElement);
};

// Function to load finance data
const onLoadFinancesData = async () => {
  try {
    // Get the selected date value from the input field
    const dateInputValue = document.getElementById("selected-date").value;
    // Get the user email from localStorage
    const email = localStorage.getItem("userEmail");
    // Fetch finance data from the server with the selected date and user email
    const result = await fetch(`https${dateInputValue}`, {
      method: "GET",
      headers: {
        email: email,
      },
    });
    // Parse the response as JSON
    const data = await result.json();
    // Render finance elements with the fetched data
    renderFinanceElements(data);
    // Render the finance list with the fetched data
    renderFinancesList(data);
    // Return the fetched data
    return data;
  } catch (error) {
    // Return an error object if the fetch fails
    return { error };
  }
};

// Function to load user information
const onLoadUserInfo = () => {
  // Get the user email from localStorage
  const email = localStorage.getItem("userEmail");
  // Get the user name from localStorage
  const name = localStorage.getItem("userName");

  // Get the navbar user info container element
  const navbarUserInfo = document.getElementById("navbar-user-container");
  // Get the navbar user avatar element
  const navbarUserAvatar = document.getElementById("navbar-user-avatar");

  // Create a paragraph element for the user email
  const emailElement = document.createElement("p");
  // Create a text node with the user email
  const emailText = document.createTextNode(email);
  emailElement.appendChild(emailText);
  navbarUserInfo.appendChild(emailElement);

  // add logout link
  const logoutElement = document.createElement("a");
  logoutElement.onclick = () => onLogout();
  logoutElement.style.cursor = "pointer";
  const logoutText = document.createTextNode("sair");
  logoutElement.appendChild(logoutText);
  navbarUserInfo.appendChild(logoutElement);

  // add user first letter inside avatar
  const nameElement = document.createElement("h3");
  const nameText = document.createTextNode(name.charAt(0));
  nameElement.appendChild(nameText);
  navbarUserAvatar.appendChild(nameElement);
};

const onLoadCategories = async () => {
  try {
    const categoriesSelect = document.getElementById("input-category");
    const response = await fetch("https");
    const categoriesResult = await response.json();
    categoriesResult.map((category) => {
      const option = document.createElement("option");
      const categoryText = document.createTextNode(category.name);
      option.id = `category_${category.id}`;
      option.value = category.id;
      option.appendChild(categoryText);
      categoriesSelect.append(option);
    });
  } catch (error) {
    alert("Error ao carregar categorias");
  }
};

const onOpenModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
};

const onCloseModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
};

const onCallAddFinance = async (data) => {
  try {
    const email = localStorage.getItem("userEmail");

    const response = await fetch("http", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        email: email,
      },
      body: JSON.stringify(data),
    });

    const user = await response.json();
    return user;
  } catch (error) {
    return { error };
  }
};

const onCreateFinanceRelease = async (target) => {
  try {
    const title = target[0].value;
    const value = Number(target[1].value);
    const date = target[2].value;
    const category = Number(target[3].value);
    const result = await onCallAddFinance({
      title,
      value,
      date,
      category_id: category,
    });

    if (result.error) {
      alert("Error ao adicionar novo dado financeiro.");
      return;
    }
    onCloseModal();
    onLoadFinancesData();
  } catch (error) {
    alert("Error ao adicionar novo dado financeiro.");
  }
};

// Function to set the initial date in the date input field
const setInitialDate = () => {
  // Get the date input element by its ID
  const dateInput = document.getElementById("selected-date");
  // Get the current date in ISO format and split to get the date part only
  const nowDate = new Date().toISOString().split("T")[0];
  // Set the value of the date input to the current date
  dateInput.value = nowDate;
  // Add an event listener to the date input to load finance data when the date changes
  dateInput.addEventListener("change", () => {
    onLoadFinancesData();
  });
};

// Function to be called when the window loads
window.onload = () => {
  // Set the initial date in the date input field
  setInitialDate();
  // Load user information
  onLoadUserInfo();
  // Load finance data
  onLoadFinancesData();
  // Load categories
  onLoadCategories();

  // Get the finance release form by its ID
  const form = document.getElementById("form-finance-release");
  // Add an event handler for the form submission
  form.onsubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Call the function to create a finance release with the form data
    onCreateFinanceRelease(event.target);
  };
};
