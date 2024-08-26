const buttonColour = ["red", "blue", "green", "yellow"];
const gamePattern = [];
var userClickedPattern = [];

// Variable to track whether the game has started
var started = false;

// Variable to track the current level
var level = 0;

// Function to play sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to animate button press
function animatePress(currentColour) {
    var selectedButton = $("#" + currentColour);
    selectedButton.addClass("pressed");
    setTimeout(function() {
        selectedButton.removeClass("pressed");
    }, 100); // 100 milliseconds
}

// Event listener for button clicks
$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Call checkAnswer() after a user has clicked and chosen their answer
    checkAnswer(userClickedPattern.length - 1);
});

// Event listener for keypress to start the game
$(document).on("keypress", function() {
    if (!started) {
        // Update the level title and start the game
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Function to generate the next sequence
function nextSequence() {
    userClickedPattern = []; // Reset the userClickedPattern array
    level++; // Increase the level by 1

    // Update the h1 with the new level
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColour[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
    // Check if the most recent user answer is the same as the game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");

        // Check if the user has finished the sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000); // 1000 milliseconds delay
        }
    } else {
        console.log("Wrong");

        // Play the wrong sound
        playSound("wrong");

        // Add the "game-over" class to the body
        $("body").addClass("game-over");

        // Remove the "game-over" class after 200 milliseconds
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        // Change the h1 title to indicate game over
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Reset the game
        startOver();
    }
}

// Function to restart the game
function startOver() {
    level = 0;
    gamePattern.length = 0;
    started = false;
}
