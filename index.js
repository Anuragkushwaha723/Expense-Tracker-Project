let expenseAmount=document.querySelector('#expenseAmount');
let desc=document.querySelector('#desc');
let category=document.querySelector('#categoryExpense');
let itemList=document.querySelector('#listItem');
let form=document.querySelector('form');
let items=document.querySelectorAll('.list-group-item');
form.addEventListener('submit',formExpense);

//submit expense function
function formExpense(e){
    e.preventDefault();
    //creating list
    let li=document.createElement('li');
    let text1=`${expenseAmount.value} - ${desc.value} - ${category.value} `;
    li.className="list-group-item";
    li.append(text1);
    let delBtn=document.createElement('button');
    let text2=`Delete Expense`;
    delBtn.className="btn btn-sm btn-outline-danger";
    delBtn.append(text2);
    let editBtn=document.createElement('button');
    let text3=`Edit Expense`;
    editBtn.className="btn btn-sm btn-outline-primary";
    editBtn.append(text3);
    li.append(delBtn);
    li.append(editBtn);
    itemList.append(li);
    //save in the local storage
    let obj={
        key:expenseAmount.value,
        desc:desc.value,
        category:category.value,
    }
    localStorage.setItem(obj.key,JSON.stringify(obj));
    //clear the value in the form
    expenseAmount.value='';
    desc.value='';
}
itemList.addEventListener('click',btnFun);
// button function
function btnFun(e){
    if(e.target.classList.contains('btn-outline-danger')){
        let str=e.target.parentElement.firstChild.textContent;
        let arr1=str.split('-');
        arr1=arr1.map(i=>Number(i));
        delStor(arr1[0]);
        e.target.parentElement.remove();
    }
    else if(e.target.classList.contains('btn-outline-primary')){
        let str=e.target.parentElement.firstChild.textContent;
        let arr1=str.split('-');
        let arr2=str.split('-');
        arr1=arr1.map(i=>Number(i));
        delStor(arr1[0]);
        expenseAmount.value=arr1[0];
        desc.value=arr2[1];
        e.target.parentElement.remove();
    }
}
// delete from localstorage
function delStor(value){
    let a=Object.keys(localStorage);
    a=a.map(i=>Number(i));
    a.forEach((val)=>{
        if(val==value){
            localStorage.removeItem(JSON.stringify(val));
        }
    })
}
localStorage.clear();