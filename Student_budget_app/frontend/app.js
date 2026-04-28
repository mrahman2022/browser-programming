const API_BASE_URL = "http://localhost:3000";

let categoryChart;
let incomeExpenseChart;

const transactionForm = document.getElementById("transactionForm");
const budgetForm = document.getElementById("budgetForm");
const transactionList = document.getElementById("transactionList");
const budgetList = document.getElementById("budgetList");

const incomeTotal = document.getElementById("incomeTotal");
const expenseTotal = document.getElementById("expenseTotal");
const balanceTotal = document.getElementById("balanceTotal");
const topCategory = document.getElementById("topCategory");

const monthFilter = document.getElementById("monthFilter");
const typeFilter = document.getElementById("typeFilter");
const categoryFilter = document.getElementById("categoryFilter");

async function fetchTransactions() {
  const response = await fetch(`${API_BASE_URL}/api/transactions`);
  if (!response.ok) throw new Error("Failed to fetch transactions");
  return response.json();
}

async function fetchBudgets() {
  const response = await fetch(`${API_BASE_URL}/api/budgets`);
  if (!response.ok) throw new Error("Failed to fetch budgets");
  return response.json();
}

async function createTransaction(transaction) {
  const response = await fetch(`${API_BASE_URL}/api/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(transaction)
  });

  if (!response.ok) throw new Error("Failed to save transaction");
}

async function deleteTransaction(id) {
  const response = await fetch(`${API_BASE_URL}/api/transactions/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) throw new Error("Failed to delete transaction");
}

async function saveBudget(budget) {
  const response = await fetch(`${API_BASE_URL}/api/budgets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(budget)
  });

  if (!response.ok) throw new Error("Failed to save budget");
}

function formatCurrency(value) {
  return `€${Number(value).toFixed(2)}`;
}

function getFilteredTransactions(transactions) {
  const month = monthFilter.value;
  const type = typeFilter.value;
  const category = categoryFilter.value;

  return transactions.filter(transaction => {
    const matchesMonth = !month || transaction.date.startsWith(month);
    const matchesType = type === "all" || transaction.type === type;
    const matchesCategory = category === "all" || transaction.category === category;
    return matchesMonth && matchesType && matchesCategory;
  });
}

function renderCategoryFilter(transactions) {
  const categories = [...new Set(transactions.map(t => t.category).filter(Boolean))];
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function renderSummary(transactions) {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  incomeTotal.textContent = formatCurrency(income);
  expenseTotal.textContent = formatCurrency(expense);
  balanceTotal.textContent = formatCurrency(income - expense);

  const expenseByCategory = {};
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + Number(t.amount);
    });

  let biggest = "-";
  let max = 0;

  for (const category in expenseByCategory) {
    if (expenseByCategory[category] > max) {
      max = expenseByCategory[category];
      biggest = category;
    }
  }

  topCategory.textContent = biggest;
}

function renderTransactions(transactions) {
  transactionList.innerHTML = "";

  if (transactions.length === 0) {
    transactionList.innerHTML = "<p>No transactions found.</p>";
    return;
  }

  transactions
    .slice()
    .reverse()
    .forEach(transaction => {
      const div = document.createElement("div");
      div.className = "transaction-item";
      div.innerHTML = `
        <h4>${transaction.title} - ${formatCurrency(transaction.amount)}</h4>
        <div class="transaction-meta">
          <p><strong>Type:</strong> ${transaction.type}</p>
          <p><strong>Category:</strong> ${transaction.category}</p>
          <p><strong>Date:</strong> ${transaction.date}</p>
          <p><strong>Payment:</strong> ${transaction.payment_method || "-"}</p>
          <p><strong>Note:</strong> ${transaction.note || "-"}</p>
        </div>
        <div class="transaction-actions">
          <button class="delete-btn" data-id="${transaction.id}">Delete</button>
        </div>
      `;
      transactionList.appendChild(div);
    });

  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", async () => {
      await deleteTransaction(button.dataset.id);
      await renderApp();
    });
  });
}

function renderBudgets(budgets, transactions) {
  budgetList.innerHTML = "";

  if (budgets.length === 0) {
    budgetList.innerHTML = "<p>No budgets set yet.</p>";
    return;
  }

  budgets.forEach(budget => {
    const spent = transactions
      .filter(t => t.type === "expense" && t.category === budget.category)
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const remaining = Number(budget.limit_amount) - spent;
    const statusClass = remaining < 0 ? "budget-warning" : "budget-ok";

    const div = document.createElement("div");
    div.className = "budget-item";
    div.innerHTML = `
      <h4>${budget.category}</h4>
      <p>Budget: ${formatCurrency(budget.limit_amount)}</p>
      <p>Spent: ${formatCurrency(spent)}</p>
      <p class="${statusClass}">Remaining: ${formatCurrency(remaining)}</p>
    `;
    budgetList.appendChild(div);
  });
}

function renderCharts(transactions) {
  const expenseTransactions = transactions.filter(t => t.type === "expense");
  const categoryTotals = {};

  expenseTransactions.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
  });

  const categoryLabels = Object.keys(categoryTotals);
  const categoryValues = Object.values(categoryTotals);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  if (categoryChart) categoryChart.destroy();
  if (incomeExpenseChart) incomeExpenseChart.destroy();

  categoryChart = new Chart(document.getElementById("categoryChart"), {
    type: "pie",
    data: {
      labels: categoryLabels.length ? categoryLabels : ["No Data"],
      datasets: [{
        data: categoryValues.length ? categoryValues : [1]
      }]
    }
  });

  incomeExpenseChart = new Chart(document.getElementById("incomeExpenseChart"), {
    type: "bar",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        label: "Amount (€)",
        data: [income, expense]
      }]
    }
  });
}

transactionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const transaction = {
    title: document.getElementById("title").value.trim(),
    amount: Number(document.getElementById("amount").value),
    type: document.getElementById("type").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
    paymentMethod: document.getElementById("paymentMethod").value,
    note: document.getElementById("note").value.trim()
  };

  await createTransaction(transaction);
  transactionForm.reset();
  renderApp();
});

budgetForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const budget = {
    category: document.getElementById("budgetCategory").value,
    limit: Number(document.getElementById("budgetAmount").value)
  };

  await saveBudget(budget);
  budgetForm.reset();
  renderApp();
});

monthFilter.addEventListener("change", renderApp);
typeFilter.addEventListener("change", renderApp);
categoryFilter.addEventListener("change", renderApp);

async function renderApp() {
  try {
    const transactions = await fetchTransactions();
    const budgets = await fetchBudgets();

    renderCategoryFilter(transactions);

    const filteredTransactions = getFilteredTransactions(transactions);
    renderSummary(filteredTransactions);
    renderTransactions(filteredTransactions);
    renderBudgets(budgets, filteredTransactions);
    renderCharts(filteredTransactions);
  } catch (error) {
    console.error(error);
    transactionList.innerHTML = "<p>Failed to load data.</p>";
  }
}

renderApp();