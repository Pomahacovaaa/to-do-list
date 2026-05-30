const pop = new Audio("pop.mp3");
pop.volume = 0.2;

// kvalitni zvuk
function playPop(){
    pop.currentTime = 0;
    pop.play();
}

function addCloseButton(li){
    const close = document.createElement("span");

    close.innerHTML = "★";
    close.className = "close";

    close.onclick = function(e){
        e.stopPropagation();

        playPop();

        li.remove();
    };

    li.appendChild(close);
}

function addListEvents(li){

    addCloseButton(li);

    li.onclick = function(){
        li.classList.toggle("checked");

        playPop();
        if(li.classList.contains("checked")){

    confetti({
        particleCount: 150,

        spread: 60,

        origin: {
            y: 0.55,
        },

        colors: [
            "#FF7EB6",
            "#FFB6D9",
            "#9DFF57",
            "#FFF5FA"
        ]
    });

}
    };
}


document.querySelectorAll("li").forEach(li => {
    addListEvents(li);
});

function newElement(){

    const input = document.getElementById("INPUT");

    if(input.value === "") return;

    const li = document.createElement("li");

    li.textContent = input.value;

    addListEvents(li);

    document.getElementById("UL").appendChild(li);

    input.value = "";

    playPop();
}

// hudba
const buttons = document.querySelectorAll(".sound");

let currentAudio = null;
let currentButton = null;

buttons.forEach(button => {

    button.onclick = function(){

        if(currentAudio){
            currentAudio.pause();
            currentAudio.currentTime = 0;

            currentButton.classList.remove("playing");
        }

        const audio = new Audio(button.dataset.sound);
        audio.volume = 0.2;

        audio.play();

        button.classList.add("playing");

        currentAudio = audio;
        currentButton = button;

        audio.onended = function(){
            button.classList.remove("playing");
        };

        playPop();
    };

});

// svetly / tmavy mod
function dark(){
    document.body.classList.add("dark");
    playPop();
}

function light(){
    document.body.classList.remove("dark");
    playPop();
}


// Make the DIV element draggable:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}