const form = document.getElementById("transactionForm");
const list = document.getElementById("transactionList");
const emptyMessage = document.getElementById("emptyMessage");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const clearBtn = document.getElementById("clearBtn");
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
function save() {
localStorage.setItem("transactions", JSON.stringify(transactions));
}
function money(value) {
return "₹" + value.toLocaleString("en-IN");
}
function render() {
list.innerHTML = "";
let income = 0;
let expense = 0;
transactions.forEach((t, index) => {
if (t.type === "income") income += t.amount;
else expense += t.amount;
const li = document.createElement("li");
li.className = "transaction";
li.innerHTML = `
<div>
<strong>${t.description}</strong><br>
<small>${t.category} • ${t.type}</small>
</div>
<div>
<strong class="${t.type}">
${t.type === "income" ? "+" : "-"}${money(t.amount)}
</strong>
<button class="delete" onclick="removeTransaction(${index})">Delete</button>
</div>
`;
list.appendChild(li);
});
incomeEl.textContent = money(income);
expenseEl.textContent = money(expense);
balanceEl.textContent = money(income - expense);
emptyMessage.style.display = transactions.length ? "none" : "block";
}
form.addEventListener("submit", (event) => {
event.preventDefault();
const description = document.getElementById("description").value.trim();
const amount = Number(document.getElementById("amount").value);
const type = document.getElementById("type").value;
const category = document.getElementById("category").value;
transactions.push({ description, amount, type, category });
save();

render();
form.reset();
});
function removeTransaction(index) {
transactions.splice(index, 1);
save();
render();
}
clearBtn.addEventListener("click", () => {
if (confirm("Delete all transactions?")) {
transactions = [];
save();
render();
}
});
render();
