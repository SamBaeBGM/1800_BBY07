function sayHello() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here.
            console.log(user.uid);
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().name;
                    console.log(n);
                    //$("#username").text(n);
                    document.getElementById("username").innerText = n;
                })
        } else {
            // No user is signed in.
        }
    });
}

window.onload = () => {
    const checkInput = document.querySelector('#todo-input');
    const inputSumbitBtn = document.querySelector('#submit-button');
    const todos = document.querySelector('#todos');
    const removeCheckedBtn = document.querySelector("#removeAllChecked");
    const removeAll = document.querySelector("#removeAll");

    // todo related data store 
    let inputValue;
    let todoListData = [];
    // let todo = [];

    // get input
    checkInput.addEventListener("keyup", function (event) {
        if (event.code == "Enter") {
            inputSumbitBtn.onclick();
        } else {
            inputValue = this.value;
        }
    });

    // put input in the data
    inputSumbitBtn.onclick = function () {
        if (inputValue == undefined || inputValue == "") {
            alert("ERROR, Cannot enter the task blank!");
        } else {
            todoListData.push(inputValue);
            checkInput.value = "";
            inputValue = undefined;
            makeList(todos, todoListData);
            let todo = document.querySelectorAll('.todo');
            todoClickEvent(todo, todoListData);
        }
    }
    removeCheckedBtn.addEventListener("click", function () {
        console.log(todoListData)
        let allTodos = document.querySelectorAll(".todo");
        for (let i = 0; i < todoListData.length; i++) {
            if (allTodos[i].classList.value.indexOf("checked") > -1) {

                allTodos[i].remove();
            }
        }

        todoListData = [];
        const aliveTodos = document.querySelectorAll(".todo");

        for (let setData of aliveTodos) {

            todoListData.push(setData.childNodes[3].innerHTML);
        }
    });

    removeAll.onclick = function () {
        let allTodos = document.querySelectorAll(".todo");
        for (let i = 0; i < todoListData.length; i++) {
            allTodos[i].remove();
        }
        todoListData = [];
    }

};

// Creation of list template 
function makeList(target, data) {
    let targetChild = document.querySelectorAll('.todo');
    for (let child of targetChild) {
        target.removeChild(child);
    }
    for (let i = 0; i < data.length; i++) {
        let template = `<li class="todo list-group-item col-xs-12" style="width:100%">
      <input type="checkbox" class="checkbox-inline" style="margin:0;">
      <b>${data[i]}</b>
      <span class="delete">Remove</span>
      <span class="edit">Edit</span>
      </li>`;
        target.innerHTML += template;
    }
}


// The style changed after the check boxes are clicked.
function todoClickEvent(target, data) {

    for (let i = 0; i < target.length; i++) {
        // console.log(target[i].childNodes)
        //Style change if the check box is clicked or not.
        target[i].childNodes[1].addEventListener('click', function () {
            if (this.parentNode.classList.value.indexOf("checked") >= 0) {
                this.parentNode.classList.remove("checked");
                this.parentNode.style.color = "#000";
                this.parentNode.style.textDecoration = "none";
            } else {
                this.parentNode.classList.add("checked");
                this.parentNode.style.color = "red";
                this.parentNode.style.textDecoration = "line-through";
            }
        });
        // Delete function
        target[i].childNodes[5].addEventListener('click', function () {
            this.parentNode.remove();
            data.splice(i, 1);
            target = document.querySelectorAll('.todo');

        });
        // Edit function
        target[i].childNodes[7].addEventListener('click', function () {
            var prompt = window.prompt("Please input your edited task.");
            if (prompt.length > 0) {
                this.parentNode.childNodes[3].innerHTML = prompt;
                data[i] = prompt;
            }
        });
    }
};


db.collection("users").doc(user.uid)
    .add({
        details: "take out garbage",
        date_created: get server time //premade function to get computers time
    })
displayCards(user.uid){
    db.collection("users").doc(user.uid).collection("reminders")
        .orderBy("date_created")
        .limit(10)
        .get(function (snap) {
            snap.forEach(function (doc) {
                details = doc.data().details;
                //create the card from template, attach details/info, attch to dom
            }
           
     }
}