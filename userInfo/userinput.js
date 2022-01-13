const form = document.querySelector("#user-form");
const userInputname = document.querySelector("#name");
const userInputsurname = document.querySelector("#surname");
const userInputage = document.querySelector("#age");
const userInputcountry = document.querySelector("#country");
const InputItems = [userInputname,userInputsurname,userInputage,userInputcountry]
const userList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-users");

eventListeners();

function eventListeners(){ 
    form.addEventListener("submit",addUser);
    document.addEventListener("DOMContentLoaded",loadAllUsersToUI);
    secondCardBody.addEventListener("click",deleteUser);
    filter.addEventListener("keyup",filterUsers);
    clearButton.addEventListener("click",clearAllUsers);

}

function clearAllUsers(e){
    if (confirm("Tümünü silmek istediğinize emin misiniz ?")) {

        while(userList.firstElementChild != null) {
            userList.removeChild(userList.firstElementChild);
        }
        localStorage.removeItem("users");
        
       


    }

}

function filterUsers(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            
            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display : block");
        }

        

    });

}

function deleteUser(e){

    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteUserFromStorage(e.target.parentElement.parentElement.textContent);

        showAlert("success","Bilgiler başarıyla silindi...");

    }

}

function deleteUserFromStorage(deleteuser){
    let users = getUsersFromStorage();

    users.forEach(function(user,index){
        if (user === deleteuser){
            users.splice(index,1); 
        }

    });

    localStorage.setItem("users",JSON.stringify(users));

}

function loadAllUsersToUI(){
    let users = getUsersFromStorage();

    users.forEach(function(user){
        //addDataToUI(user);


    })

}

function addUser(e){
    var newUser = ""
    var wronginput = "False"
    for (var i = 0; i < InputItems.length; i++) {

        if (InputItems[i].value.length == 0) {
            wronginput = "True";
        } 
    }
    for (var i = 0; i < InputItems.length; i++) {
        newUser = newUser +" "+InputItems[i].value
    }
       


    if (wronginput == "True") {
        
        showAlert("danger","Lütfen bilgilerinizi girin...");
    }
    else {
        addUserToUI(newUser); 
        addUserToStorage(newUser);

        showAlert("success","Bilgiler başarıyla eklendi...");

    }
    




    e.preventDefault();

}

function getUsersFromStorage(){ 
    let users;

    if (localStorage.getItem("users") === null){
        users = [];
    }
    else {
        users = JSON.parse(localStorage.getItem("users"));

    }
    return users;


}
function addUserToStorage(newUser){
    let users = getUsersFromStorage();

    users.push(newUser);

    localStorage.setItem("users",JSON.stringify(users));



}

function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);

   

    setTimeout(function(){
        alert.remove();

    },1000);



}

function resetform() {
    userInputname.value = "";
    userInputsurname.value = "";
    userInputage.value = "";
    userInputcountry.value = "";
}

function addUserToUI(newUser){ 
   const listItem = document.createElement("li");
  
   const link = document.createElement("a");
   link.href = "#";
   link.className = "delete-item";
   link.innerHTML = "<i class = 'fa fa-remove'></i>";

   listItem.className = "list-group-item d-flex justify-content-between";

   

   listItem.appendChild(document.createTextNode(newUser));
   listItem.appendChild(link);

   

   userList.appendChild(listItem);
   resetform();





}
