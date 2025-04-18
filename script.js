document.addEventListener('DOMContentLoaded',()=>{
const expensesForm = document.getElementById('expense-form')
const expenseNameInput = document.querySelector('#expense-name')
const  expenseAmountInput = document.querySelector('#expense-amount')
const addBtn = document.querySelector('#dd-btn')
const totalAmountDisplay = document.querySelector('#total-amount')
const expenseList = document.querySelector('#expense-list')



let  expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let  totalAmount = calculateTotal()
renderExpense()
expensesForm.addEventListener("submit",(e)=>{
e.preventDefault();
const name = expenseNameInput.value.trim();
const amount = parseFloat(expenseAmountInput.value.trim());
if(name !=="" && !isNaN(amount) && amount > 0){
const newExpense = {
    id: Date.now(),
    name: name,
    amount: amount,
};
expenses.push(newExpense);
saveExpensesToLocal();
renderExpense()
updateTotal()
//clear input
expenseNameInput.value = "";
expenseAmountInput.value = "";
}
});
function renderExpense(){
    expenseList.innerHTML=""
    expenses.forEach(expense => {
        const list = document.createElement('li')
        list.innerHTML=`
        ${expense.name} -$${expense.amount}
        <button data-id="${expense.id}"><span class="material-symbols-outlined">delete</span></button>
        `
         expenseList.appendChild(list)
    })
    }
function calculateTotal(){
return expenses.reduce((sum,expense) => sum + expense.amount,0)
}
function saveExpensesToLocal(){
    localStorage.setItem("expenses",JSON.stringify(expenses))
}
function updateTotal(){
   totalAmount = calculateTotal()
   totalAmountDisplay.textContent = totalAmount.toFixed(2)
}
expenseList.addEventListener('click',(e)=>{
    const button = e.target.closest('button');
    if (button) {
      const expenseId = parseInt(button.getAttribute('data-id'));
      expenses = expenses.filter(expense => expense.id !== expenseId);
      saveExpensesToLocal();
      renderExpense();
      updateTotal();
    }
    
//another method using tagName()
// if(e.target.tagName('button')){
//   const expenseId = parseInt(e.target.getAttribute('data-id'))
//   expenses = expenses.filter(expense => expense.id !== expenseId) 
//   saveExpensesToLocal()
//   renderExpense()
//   updateTotal()
// }
})
})
