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


let todos = [];
var input = document.getElementById("input");
var ul = document.getElementById("ul");

function add(){
    // add new item to todos array
    todos.push(input.value);
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
}

function render() {
    ul.innerHTML = null;

    var list = localStorage.getItem('todos');
    var todoData = JSON.parse(list);
    todos = todoData || [];

    // loop through todos
    if (todos) {
        for(let i = 0; i < todos.length; i++) {
            // create text and button
            var li = document.createElement("li");
            var text = document.createTextNode(todos[i]);
            var button = document.createElement('button');
            button.innerText = 'delete';
            // add function to delete todo item
            button.addEventListener('click', function() {
                todos.splice(i, 1);
                localStorage.setItem('todos', JSON.stringify(todos));
                render();
            });
        
            li.appendChild(text);
            li.appendChild(button);
        
            ul.appendChild(li);
        }
        console.log(todos);
        
        input.value = null;
    }
}

render();