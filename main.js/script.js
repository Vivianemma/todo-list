
//nav
function _(str) {
    return document.querySelector(str);
}

window.addEventListener("scroll", function() {
    if ( document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
        _('nav').classList.add("black");
    }else {
        
        _("nav").classList.remove("black");
    }
});


//to do list
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date")
const list = document.getElementById("list");
const input = document.getElementById("input");



const CHECK = "fa-check-cricle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough"

//variables
let LIST,  id, item;
// get item form localstorage
let data = localStorage.getItem("toDo");

// check if data is not empty
if (data){
    LIST = JSON.parse(data);
    id = LIST.length;
    leadList(LIST);
}else {
    // if data isn't empt
    LIST = [];
    id = 0;
    item = [];
}

//load item to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload()
})
//show todays date
const options = {weekday : "long", month: "short", day: "numeric"};

const today = new Date ();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function
function addToDo(toDo, id, done, trash){

    if (trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const text = document.createElement('li');
    text.innerHTML = `<li class="item">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}"> ${toDo} </p>
                        <i class="fa fa-trash-o delete" job ="delete" id="${id}"></i>
                    </li>
                    `;
        
        // const position = "beforeend";
        // list.insertAdjacentHTML(position, item);
        list.appendChild(text);

};

document.addEventListener("keyup",function(even){
    if (event.keyCode == 13){
        const toDo = input.value;

        if (toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            })
            console.log(LIST)
            // const item = document.createElement('li');
            // item.innerText = 'nxknksnknsknskn';
            // document.getElementById('list').appendChild(item);

            localStorage.setItem("toDO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
           
    }
});
 
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
    }else if (elementJob == "delete"){
        removeToDo(element);
    }
    localStorage.setItem("toDO", JSON.stringify(LIST));

});