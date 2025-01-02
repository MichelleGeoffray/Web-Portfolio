$(document).ready(function() {
  ////////////////////////////////
  //checklist dropdown bar
  $("#checklistForm").animate({
    height: "toggle",
  }, 0);
  $("#checklistForm").css("visibility","visible");

  var checklistIsShowing = 1;
  //when checklist is clicked
  $("#checklist").click(function(e) {
    e.preventDefault();

    if (checklistIsShowing%2) {
      //move on screen when isShoving is odd
      $("#checklistForm").animate({
        height: "toggle"
      }, 500);

      $("#checklist").css("background-color", "rgba(137, 39, 24, .95)");
      checklistIsShowing++;
    } else {
      //move off screen when isShoving is even 
      $("#checklistForm").animate({
        height: "toggle"
      }, 500);

      $("#checklist").css("background-color","rgba(137, 39, 24, .75)");
      checklistIsShowing++
    }
  }); //end checklist click

  //when the X is clicked
  $("#checklistClose").click(function(e) {
    e.preventDefault();

    $("#checklistForm").animate({
      height: "toggle"
    }, 500);

    $("#checklist").css("background-color","rgba(137, 39, 24, .75)");
    checklistIsShowing++;
  }); //end close X click  
  //end checklist dropdown bar
  ////////////////////////////////

  document.getElementById("startBtn").addEventListener("click", startGame);
  document.getElementById("resetBtn").addEventListener("click", resetGame);
  document.getElementById("confirmBtn").addEventListener("click", confirmResetGame);

  ////////////////////////////////
  //holes grow and highlight hover
  const holes = document.querySelectorAll('.hole');
  holes.forEach(hole => {
    hole.addEventListener('mouseover', () => {
      if (!hole.classList.contains('active') && started) {
        hole.style.transform = 'scale(1.1)';
        hole.style.border = "2px solid yellow";
      }
    });
  
    hole.addEventListener('mouseout', () => {
      if (!hole.classList.contains('active') && started) {
        hole.style.transform = 'scale(1)';
        hole.style.border = "none";
      }
    });
  });
  //end hole grow and highlight hover
  ////////////////////////////////

  ////////////////////////////////
  //Game title rainbow flash hover
  const gameTitle = document.getElementById("gameTitle");
  var paused = false;
  gameTitle.addEventListener('mouseover', () => {
    if (!paused) {
      paused = true;
      gameTitle.style.color = "red";
      setTimeout(() => {
        gameTitle.style.color = "orange";
      }, 300);
      setTimeout(() => {
        gameTitle.style.color = "green";
      }, 600);
      setTimeout(() => {
        gameTitle.style.color = "blue";
      }, 900);
      setTimeout(() => {
        gameTitle.style.color = "purple";
      }, 1200);
      setTimeout(() => {
        gameTitle.style.color = "black";
        paused = false;
      }, 1500);
    }
  });
  //end rainbow flash hover
  ////////////////////////////////
 
}); //end document ready


const holes = document.querySelectorAll('.hole');
const startBtn = document.getElementById('startBtn');
const scoreDisplay = document.getElementById('score');
var started = false;
var dropdownIsShowing = false;
let score = 0;
let activeHole = null;
let gameInterval;
let moleInterval;

let timeRemaining = 30; // Start with 30 seconds
let timerInterval; // Interval for the countdown
const timerElement = document.getElementById('timer');
let ended = false;

function startGame() {
  if (!started) {
    startBtn.disabled = true;
    clearInterval(timerInterval);
    clearInterval(gameInterval);
    clearInterval(moleInterval);
    
    const resetBtn = document.getElementById("resetBtn");
    
    holes.forEach((hole, index) => {
      setTimeout(() => {
        hole.style.transition = "transform 1.5s ease, opacity 0.5s ease";
        hole.style.transform = "translateX(0)"; // Move to original position
        hole.style.opacity = "1";
      }, index * 400);
    });
    setTimeout(() => {
      started = true;
      resetBtn.style.opacity = "1";

      const gameInfo = document.getElementById("game-info");
      gameInfo.style.opacity = "1";
      holes.forEach((hole) => {
        hole.style.transition = "transform 0.3s ease, opacity 0.5s ease";
      });
      startMoles();
    }, 4900);
  }
} // end startGame

function startMoles() {
  score = 0;
  timeRemaining = 30;
  scoreDisplay.textContent = score;
  timerElement.textContent = timeRemaining;


  // Start the countdown timer
  timerInterval = setInterval(() => {
    timeRemaining--;
    timerElement.textContent = timeRemaining;
    if (timeRemaining <= 0) {
      stopGame(); // End the game when time runs out
    }
  }, 1000);
  
  gameInterval = setInterval(() => {
    showMole();
  }, 1500);
  moleInterval = setInterval(() => {
    showMole();
  }, 1000);
}

function confirmResetGame() {
  startBtn.disabled = false;

  //move the drop down back off the screen
  $("#dropdown").css("top", "-330px");
  dropdownIsShowing = false;

  started = false;
  startBtn.disabled = false;
  
  resetBtn.style.opacity = "0";
  
  const leftCurtain = document.getElementById("left");
  const rightCurtain = document.getElementById("right");
  const starsLeft = document.getElementById('starsLeft');
  const starsRight = document.getElementById('starsRight');

  // close curtains
  starsLeft.style.opacity = "0";
  starsRight.style.opacity = "0";
  leftCurtain.style.transform = "scale(4.55, 1) translate(40%, 0)";
  rightCurtain.style.transform = "scale(4.55, 1) translate(-40%, 0)";

  // Add an event listener for the transition end
  leftCurtain.addEventListener("transitionend", function onClose() {
    leftCurtain.removeEventListener("transitionend", onClose);

    //remove and reset holes
    holes.forEach((hole) => {
      hole.style.transform = "translateX(-600%)"; // Move off screen
      hole.style.opacity = "0";
    });

    //remove game-info
    const gameInfo = document.getElementById("game-info");
    gameInfo.style.opacity = "0";

    setTimeout(() => {
      // open curtains
      leftCurtain.style.transform = "scale(1, 1) translate(0, 0)";
      rightCurtain.style.transform = "scale(1, 1) translate(0, 0)";
    }, 150);

    setTimeout(() => {
      starsLeft.style.opacity = "1";
      starsRight.style.opacity = "1";
    }, 1500);

    
    
  });  


  timeRemaining = 30;
  score = 0;
 // timerElement.textContent = timeRemaining;

  // Stop any running game intervals
  clearInterval(timerInterval);
  clearInterval(gameInterval);
  clearInterval(moleInterval);
  activeHole = null;

} //end confirmResetGame


function resetGame() {
  if (dropdownIsShowing == false && (started == true) || (ended == true)) {
    if (ended) {
      const gameInfo = document.getElementById("game-info");
      gameInfo.style.transform = "scale(1, 1) translate(0, 0)";
      ended = false;
    }

    $("#dropdown").animate({
      top:"+=630"
    }, 1000);
    
    dropdownIsShowing = true;
    $("#dropdown").addClass("fixed");

    //close the dropdown div
    $("#cancelBtn").click(function(event){
        //prevent the default functionality
        event.preventDefault();

        //move the drop down back off the screen
        $("#dropdown").css("top", "-330px");
        dropdownIsShowing = false;
    });
  } else {
    //make the div flash red
    const dropdownDiv = document.getElementById("dropdown");
    dropdownDiv.style.backgroundColor = "#d27979";
    setTimeout(() => {
      dropdownDiv.style.backgroundColor = "#dae6e6";
    }, 150);
  }    
} //end resetGame


function randomHole() {
  const randomIndex = Math.floor(Math.random() * holes.length);
  return holes[randomIndex];
}

function showMole() {
  const hole = randomHole();
  if (activeHole !== hole) {
    hole.classList.add('active');
    const mole = document.createElement('div');
    mole.classList.add('mole');
    hole.appendChild(mole);
    setTimeout(() => {
      hole.removeChild(mole);
      hole.classList.remove('active');
    }, 1000);
    activeHole = hole;
  }
}

function stopGame() {
  clearInterval(timerInterval);
  clearInterval(gameInterval);
  clearInterval(moleInterval);
  activeHole = null;

  const gameInfo = document.getElementById("game-info");
  gameInfo.style.transform = "scale(2.5, 2.5) translate(50%, 50%)";
  ended = true;
}

holes.forEach(hole => {
  hole.addEventListener('click', () => {
    if (hole.classList.contains('active')) {
      score++;
      scoreDisplay.textContent = score;
      hole.classList.remove('active');
    }
  });
});
console.log(timerElement); // Should not be null
