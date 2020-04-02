const form =document.querySelector(".js-form"),
 input = form.querySelector("input"),
 greeting = document.querySelector(".js-greeting");


const USER_LS ="currentUser",
 SHOWING_CN ='showing';

function saveName(text){
    localStorage.setItem(USER_LS,text); //중요함
}


function handleSubmit(event){
    event.preventDefault(); //중요함
    const cuurentValue = input.value;
    paintGreeting(cuurentValue);
    saveName(cuurentValue);
}

function askForname(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit); //중요함
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText =`Hello ${text}`;
}

function loadname(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser===null){
        askForname();
    }else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadname();
}
init()