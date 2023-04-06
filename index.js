let expenseAmount = document.querySelector('#expenseAmount');
let desc = document.querySelector('#desc');
let category = document.querySelector('#categoryExpense');
let itemList = document.querySelector('#listItem');
let form = document.querySelector('form');
let items = document.querySelectorAll('.list-group-item');
form.addEventListener('submit', formExpense);

//get data
window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/expense/get-expense-data')
        .then((res) => {
            for (var i = 0; i < res.data.length; i++) {
                showOutput(res.data[i]);
            }
        })
        .catch(err => console.log(err));
})

//submit expense function
function formExpense(e) {
    e.preventDefault();
    //save in the local storage
    let object = {
        amount: expenseAmount.value,
        description: desc.value,
        category: category.value
    }
    axios.post('http://localhost:3000/expense/add-expense-data', object)
        .then((res) => {
            showOutput(res.data);
        })
        .catch(err => console.log(err));
    //clear the value in the form
    expenseAmount.value = '';
    desc.value = '';
}

const delFun = (id) => {
    axios.delete(`http://localhost:3000/expense/delete-expense-data/${id}`)
        .then((res) => {
            removeFromScreen(res.data.id);
        })
        .catch(err => console.log(err));
}

function editFun(data) {
    axios.delete(`http://localhost:3000/expense/delete-expense-data/${data.id}`)
        .then((res) => {
            removeFromScreen(res.data.id);
        })
        .catch(err => console.log(err));
    expenseAmount.value = data.amount;
    desc.value = data.description;
}

function showOutput(data) {
    //creating list
    let li = document.createElement('li');
    li.id = data.id;
    let text1 = `${data.amount} - ${data.description} - ${data.category} `;
    li.className = "list-group-item";
    li.append(text1);
    let delBtn = document.createElement('button');
    delBtn.onclick = function () {
        delFun(data.id);
    }
    let text2 = `Delete Expense`;
    delBtn.className = "btn btn-sm btn-outline-danger";
    delBtn.append(text2);
    let editBtn = document.createElement('button');
    editBtn.onclick = function () {
        editFun(data);
    }
    let text3 = `Edit Expense`;
    editBtn.className = "btn btn-sm btn-outline-primary";
    editBtn.append(text3);
    li.append(delBtn);
    li.append(editBtn);
    itemList.append(li);
}

function removeFromScreen(id) {
    let child = document.getElementById(id);
    if (child) {
        itemList.removeChild(child);
    }

}