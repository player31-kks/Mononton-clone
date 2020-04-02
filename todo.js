const toDoForm = document.querySelector('.js-toDoForm'),
 toDoInput = toDoForm.querySelector("input"),
 toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';
let toDos =[];


function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter( function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    console.log(toDos,cleanToDos)
    toDos = cleanToDos;
    saveToDos();
    }

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}
function painToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length+1;
    delBtn.innerText ="❌";
    delBtn.addEventListener("click",deleteTodo);

    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId
    toDoList.appendChild(li);
    const toDoObj ={
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    painToDo(currentValue);
    toDoInput.value="";
}



function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos =JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
           painToDo(toDo.text);
        })
    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();
