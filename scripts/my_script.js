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
//sayHello();

$( document ).ready(function() {

    "use strict";

    var todo = function() {
        $('.todo-list .todo-item input').click(function() {
        if($(this).is(':checked')) {
            $(this).parent().parent().parent().toggleClass('complete');
        } else {
            $(this).parent().parent().parent().toggleClass('complete');
        }
    });

    $('.todo-nav .all-task').click(function() {
        $('.todo-list').removeClass('only-active');
        $('.todo-list').removeClass('only-complete');
        $('.todo-nav li.active').removeClass('active');
        $(this).addClass('active');
    });

    $('.todo-nav .active-task').click(function() {
        $('.todo-list').removeClass('only-complete');
        $('.todo-list').addClass('only-active');
        $('.todo-nav li.active').removeClass('active');
        $(this).addClass('active');
    });

    $('.todo-nav .completed-task').click(function() {
        $('.todo-list').removeClass('only-active');
        $('.todo-list').addClass('only-complete');
        $('.todo-nav li.active').removeClass('active');
        $(this).addClass('active');
    });

    $('#uniform-all-complete input').click(function() {
        if($(this).is(':checked')) {
            $('.todo-item .checker span:not(.checked) input').click();
        } else {
            $('.todo-item .checker span.checked input').click();
        }
    });

    $('.remove-todo-item').click(function() {
        $(this).parent().remove();
    });
    };

    todo();

    $(".add-task").keypress(function (e) {
        if ((e.which == 13)&&(!$(this).val().length == 0)) {
            $('<div class="todo-item"><div class="checker"><span class=""><input type="checkbox"></span></div> <span>' + $(this).val() + '</span> <a href="javascript:void(0);" class="float-right remove-todo-item"><i class="icon-close"></i></a></div>').insertAfter('.todo-list .todo-item:last-child');
            $(this).val('');
        } else if(e.which == 13) {
            alert('Please enter new task');
        }
        $(document).on('.todo-list .todo-item.added input').click(function() {
            if($(this).is(':checked')) {
                $(this).parent().parent().parent().toggleClass('complete');
            } else {
                $(this).parent().parent().parent().toggleClass('complete');
            }
        });
        $('.todo-list .todo-item.added .remove-todo-item').click(function() {
            $(this).parent().remove();
        });
    });
});

const btn = document.querySelector('#btn');
// handle button click
btn.onclick = function () {
    const rbs = document.querySelectorAll('input[name="colors"]');
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }
    if (!document.getElementById("settingsNav").classList.contains('userColorPurple') && selectedValue == "Purple") {
        document.getElementById("settingsNav").classList.remove('userColorBlue','userColorGreen');
        document.getElementById("settingsNav").classList.add('userColorPurple');
    }
    if (!document.getElementById("settingsNav").classList.contains('userColorGreen') && selectedValue == "Green") {
        document.getElementById("settingsNav").classList.remove('userColorBlue','userColorPurple');
        document.getElementById("settingsNav").classList.add('userColorGreen');
    }
    if (!document.getElementById("settingsNav").classList.contains('userColorBlue') && selectedValue == "Blue") {
        document.getElementById("settingsNav").classList.remove('userColorGreen','userColorPurple');
        document.getElementById("settingsNav").classList.add('userColorBlue');
    }
    console.log(selectedValue)
};


var currentUser
function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userWork = userDoc.data().work;
                    var userEmail = userDoc.data().email;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userWork != null) {
                        document.getElementById("workInput").value = userWork;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    userWork = document.getElementById('workInput').value;     //get the value of the field with id="schoolInput"
    userEmail = document.getElementById('emailInput').value;       //get the value of the field with id="cityInput"

    currentUser.update({
        name: userName,
        work: userWork,
        email: userEmail
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
    document.getElementById('personalInfoFields').disabled = true;
}
// function myFunction() {

//     var test = document.getElementsByClassName("navbar"),
//     classes = ['userColorPurple', 'userColorBlue', 'userColorGreen'];

//     test.innerHTML = "";

//     console.log("asdas");

//     var texts = document.getElementsByClassName("navbar");

//     console.log(texts);

//     if (!document.getElementById("settingsNav").classList.contains('userColorBlue') && e.getStateChange() == ItemEvent.SELECTED) {
//         document.getElementById("settingsNav").classList.remove('userColorGreen','userColorPurple');
//         document.getElementById("settingsNav").classList.add('userColorBlue');
//     }
//     if (!document.getElementById("settingsNav").classList.contains('userColorGreen') && document.getElementById('ColorGreen').checked) {
//         document.getElementById("settingsNav").classList.remove('userColorBlue','userColorPurple');
//         document.getElementById("settingsNav").classList.add('userColorGreen');
//     }
//     if (!document.getElementById("settingsNav").classList.contains('userColorPurple') && selectedValue == "Purple") {
//         document.getElementById("settingsNav").classList.remove('userColorBlue','userColorGreen');
//         document.getElementById("settingsNav").classList.add('userColorPurple');
//     }

// }

// myFunction()
