let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;
    
//Set Budget Part
totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  //empty or negative input
  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    //Set Budget
    amount.innerHTML = tempAmount;
    //Set Balance
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    //Clear Input Box
    totalAmount.value = "";
  }
});

//Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//Function To Modify List Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureValue.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText =
    parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
};

//Function To Create List
const listCreator = (expenseName, expenseValue) => {
  if(expenseName && expenseValue){
  document.getElementById("list").textContent="";
  const date=new Date()
  const title=expenseName
  const amount=expenseValue
  let dat=(JSON.parse(localStorage.getItem("username")))
  dat=JSON.stringify(dat);
  console.log(dat)
  let data=JSON.parse(localStorage.getItem(dat))||[]
  const values={title,amount,date}
  data.push(values)
  localStorage.setItem(dat,JSON.stringify(data))
 
  const value={title,amount}
  data.forEach((item,index)=>{
    const t=item.title
    const a=item.amount
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${item.title}</p><p class="amount">${item.amount}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener('click', () => {
    data.splice(index,1)
    localStorage.setItem(dat,JSON.stringify(data))
    modifyElement(deleteButton)
  })
  let showdetails=document.createElement("a");
  showdetails.textContent="Show details";
  showdetails.style.fontsize="1.2em";
  showdetails.style.textDecoration="none";
  showdetails.style.cursor="pointer";
  showdetails.href="index.html";
  showdetails.addEventListener('click',()=>{
    localStorage.setItem('title',JSON.stringify(item.title))
    localStorage.setItem('amount',JSON.stringify(item.amount))
    localStorage.setItem('date',JSON.stringify(item.date))
  })
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  sublistContent.appendChild(showdetails);
  document.getElementById("list").appendChild(sublistContent);
  console.log(item.date);
})
  }
}
//Function To Add Expenses
checkAmountButton.addEventListener("click", () => {
  //empty checks
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  //Enable buttons
  disableButtons(false);
  //Expense
  let expenditure = parseInt(userAmount.value);
  //Total expense (existing + new)
  let sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  //Total balance(budget - total expense)
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  //Create list
  listCreator(productTitle.value, userAmount.value);
  //Empty inputs
  productTitle.value = "";
  userAmount.value = "";
  
});

  window.onload=display
  function display(){
    let dat=JSON.parse(localStorage.getItem("username"))
    let data
    dat=JSON.stringify(dat)
    data=JSON.parse(localStorage.getItem(dat))||[]
    console.log((dat))
    const date=new Date()
    data.forEach((item,index)=>{
      const t=item.title
      const a=item.amount
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">${item.title}</p><p class="amount">${item.amount}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener("click", () => {
      modifyElement(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "1.2em";
    deleteButton.addEventListener("click", () => {
      data.splice(index,1)
      localStorage.setItem(dat,JSON.stringify(data))
      modifyElement(deleteButton);
    });
    let showdetails=document.createElement("a");
    showdetails.textContent="Show details";
    showdetails.style.fontsize="1.2em";
    showdetails.style.textDecoration="none";
    showdetails.style.cursor="pointer";
    showdetails.href="index.html";
    showdetails.addEventListener('click',()=>{
      localStorage.setItem('title',JSON.stringify(item.title))
      localStorage.setItem('amount',JSON.stringify(item.amount))
      localStorage.setItem('date',JSON.stringify(item.date))
    })
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    sublistContent.appendChild(showdetails);
    document.getElementById("list").appendChild(sublistContent);
    console.log(item.date);
    console.log(dat)
    })

}