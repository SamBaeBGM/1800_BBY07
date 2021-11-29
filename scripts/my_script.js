function sayHello() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      // Do something for the user here.
      console.log(user.uid);
      db.collection("users")
        .doc(user.uid)
        .get()
        .then(function (doc) {
          var n = doc.data().name;
          console.log(n);
          //$("#username").text(n);
          document.getElementById("username").innerText = n;
        });
    } else {
      // No user is signed in.
    }
  });
}
//sayHello();

// $( document ).ready(function() {

//     var todo = function() {
//         $('.todo-list .todo-item input').click(function() {
//         if($(this).is(':checked')) {
//             $(this).parent().parent().parent().toggleClass('complete');
//         } else {
//             $(this).parent().parent().parent().toggleClass('complete');
//         }
//     });

//     $('.todo-nav .all-task').click(function() {
//         $('.todo-list').removeClass('only-active');
//         $('.todo-list').removeClass('only-complete');
//         $('.todo-nav li.active').removeClass('active');
//         $(this).addClass('active');
//     });

//     $('.todo-nav .active-task').click(function() {
//         $('.todo-list').removeClass('only-complete');
//         $('.todo-list').addClass('only-active');
//         $('.todo-nav li.active').removeClass('active');
//         $(this).addClass('active');
//     });

//     $('.todo-nav .completed-task').click(function() {
//         $('.todo-list').removeClass('only-active');
//         $('.todo-list').addClass('only-complete');
//         $('.todo-nav li.active').removeClass('active');
//         $(this).addClass('active');
//     });

//     $('#uniform-all-complete input').click(function() {
//         if($(this).is(':checked')) {
//             $('.todo-item .checker span:not(.checked) input').click();
//         } else {
//             $('.todo-item .checker span.checked input').click();
//         }
//     });

//     $('.remove-todo-item').click(function() {
//         $('todo-item .checker input').click();
//         $(this).parent().remove();
//     });

//     $('button').click(function () {
//         $('#todo').append("<ul>" + $("input[name=task]").val() + " <a href='#' class='close' aria-hidden='true'>&times;</a></ul>");
//     });
//     $("body").on('click', '#todo a', function () {
//         $(this).closest("ul").remove();
//     });
//     };

//     todo();

//     $(".add-task").keypress(function (e) {
//         if ((e.which == 13)&&(!$(this).val().length == 0)) {
//             $('<div class="todo-item"><div class="checker"><span class=""><input type="checkbox"></span></div> <span>' + $(this).val()
//             + '</span> <a href="javascript:void(0);" class="float-right remove-todo-item"><i class="icon-close"></i></a></div>').insertAfter('.todo-list .todo-item:last-child');
//             $(this).val('');
//         } else if(e.which == 13) {
//             alert('Please enter new task');
//         }
//         $(document).on('.todo-list .todo-item.added input').click(function() {
//             if($(this).is(':checked')) {
//                 $(this).parent().parent().parent().toggleClass('complete');
//             } else {
//                 $(this).parent().parent().parent().toggleClass('complete');
//             }
//         });
//         $('.todo-list .todo-item.added .remove-todo-item').click(function() {
//             $(this).parent().remove();
//         });
//     });

// });

window.onload = () => {
  const checkInput = document.querySelector("#todo-input");
  const inputSumbitBtn = document.querySelector("#submit-button");
  const todos = document.querySelector("#todos");
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
      let todo = document.querySelectorAll(".todo");
      todoClickEvent(todo, todoListData);
    }
  };
  removeCheckedBtn.addEventListener("click", function () {
    console.log(todoListData);
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
  };
};

// Creation of list template
function makeList(target, data) {
  let targetChild = document.querySelectorAll(".todo");
  for (let child of targetChild) {
    target.removeChild(child);
  }
  for (let i = 0; i < data.length; i++) {
    let template = `<li class="todo list-group-item col-xs-12" style="width:100%">
        <input type="checkbox" class="custom-checkbox checkbox-lg" style="margin:0;">
        <b>${data[i]}</b>
        <span class="delete">Delete</span>
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
    target[i].childNodes[1].addEventListener("click", function () {
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
    target[i].childNodes[5].addEventListener("click", function () {
      this.parentNode.remove();
      data.splice(i, 1);
      target = document.querySelectorAll(".todo");
    });
    // Edit function
    target[i].childNodes[7].addEventListener("click", function () {
      var prompt = window.prompt("Please input your edited task.");
      if (prompt.length > 0) {
        this.parentNode.childNodes[3].innerHTML = prompt;
        data[i] = prompt;
      }
    });
  }
}

// const btn = document.querySelector('#btn');
// // handle button click
// btn.onclick = function () {
//     const rbs = document.querySelectorAll('input[name="colors"]');
//     let selectedValue;
//     for (const rb of rbs) {
//         if (rb.checked) {
//             selectedValue = rb.value;
//             break;
//         }
//     }
//     if (!document.getElementById("settingsNav").classList.contains('userColorPurple') && selectedValue == "Purple") {
//         document.getElementById("settingsNav").classList.remove('userColorBlue', 'userColorGreen');
//         document.getElementById("settingsNav").classList.add('userColorPurple');
//     }
//     if (!document.getElementById("settingsNav").classList.contains('userColorGreen') && selectedValue == "Green") {
//         document.getElementById("settingsNav").classList.remove('userColorBlue', 'userColorPurple');
//         document.getElementById("settingsNav").classList.add('userColorGreen');
//     }
//     if (!document.getElementById("settingsNav").classList.contains('userColorBlue') && selectedValue == "Blue") {
//         document.getElementById("settingsNav").classList.remove('userColorGreen', 'userColorPurple');
//         document.getElementById("settingsNav").classList.add('userColorBlue');
//     }
//     console.log(selectedValue)
// };

var currentUser;
var userReminders;

// This function populates user info for settings page.
function populateInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      userReminders = db.collection("reminders").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data fields of the user
        var userName = userDoc.data().name;
        var userWork = userDoc.data().work;

        //if the data fields are not empty, then write them in to the form.
        if (userName != null) {
          document.getElementById("nameInput").value = userName;
        }
        if (userWork != null) {
          document.getElementById("workInput").value = userWork;
        }
      });
    } else {
      console.log("no user logged in.");
    }
  });
}
// populateInfo();

function editUserInfo() {
  //Enable the form fields
  document.getElementById("personalInfoFields").disabled = false;
}

function saveUserInfo() {
  userName = document.getElementById("nameInput").value;
  userWork = document.getElementById("workInput").value;

  currentUser
    .update({
      name: userName,
      work: userWork,
    })
    .then(() => {
      console.log(userWork);
      console.log("Document successfully updated!");
    });

  //Enable the form fields
  document.getElementById("personalInfoFields").disabled = true;
}
