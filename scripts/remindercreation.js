const important = document.getElementById("important");

  
function addReminder(remind) {
  const text = <li class="reminder">
    <i class="form-check-input me-1" type="checkbox" value="Reminder1" job="complete"></i>
    <p class="text"> </p>
    </li>

    const reminderPosition = "beforeend";

    list.insertAdjacentHTML(reminderPosition, text);

    addReminder("Drink Coffe");

}

