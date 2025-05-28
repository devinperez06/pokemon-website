let dark_mode = document.getElementById("theme-button");


const toggleDarkMode = () => {

    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      dark_mode.textContent = "Toggle Light-Mode";
    } else {
      dark_mode.textContent = "Toggle Dark-Mode";
    }
}

dark_mode.addEventListener("click", toggleDarkMode);

let submit = document.getElementById("rsvp-button");
let count = 3;

const addParticipant = (event, person) => {

  event.preventDefault();

  let name = person.name;
  let state = person.state;
  let email = person.email;

  let count_text = document.getElementById('rsvp-count');

  const para = document.createElement("p");
  const node = document.createTextNode("🎟️ " + name + " from " + state + " has signed up.");
  const element = document.getElementById("participants");
  element.appendChild(para);
  para.appendChild(node);

  count_text.remove();

  count = count + 1;
  const para2 = document.createElement("p");
  para2.id = "rsvp-count";
  const node2 = document.createTextNode("⭐ " +  count + " people have signed up!");
  const element2 = document.getElementById("participants");
  element2.appendChild(para2);
  para2.appendChild(node2);
}

const validateForm = (event) => {

  person = {
    name: document.getElementById('name').value,
    state: document.getElementById('state').value,
    email: document.getElementById('email').value
  }

  let containsErrors = false;

  var rsvpInputs = document.getElementById("rsvp-form").elements;
  for (let i = 0; i < rsvpInputs.length; i ++) {
    if (rsvpInputs[i].value.length < 2){
      containsErrors = true;
      rsvpInputs[i].classList.add('error');
    } else{
      rsvpInputs[i].classList.remove('error');
    }
  }

  let email = document.getElementById("email");
  if (!email.value.includes(".com")) {
    if (!email.value.includes("@")) {
      containsErrors = true;
      email.classList.add('error');
    }
    else {
      email.classList.remove('error');
    }
  }

  if (containsErrors === false) {
    addParticipant(event, person);
    toggleModal(person)
    for (let j = 0; j < rsvpInputs.length; j ++) {
      rsvpInputs[j].value = "";
    }
  }
}

submit.addEventListener("click", validateForm);

const toggleModal = (person) => {
  let modal = document.getElementById("success-modal");
  let modalContent = document.getElementById("modal-text");
  modal.style.display = "flex";
  modalContent.textContent = `Thanks, ${person.name}! 
    You will receive emails about any updates made to the Pokémon: Legends Z-A game!`;
  let intervalId = setInterval(animateImage, 500);
  setTimeout(() => {
    clearInterval(intervalId);
    modal.style.display = "none";
  }, 5000);
}

let rotateFactor = 0;
let modalImage = document.getElementById("modal-img");

const animateImage = () => {
  rotateFactor = rotateFactor === 0 ? -10 : 0;
  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
}