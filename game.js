var buttonArray = ["red", "blue", "yellow", "green"];
var level = 1;
var pattern = [];
var started = false;
var i = 0;
var flag;

function RandomNumber() {
  return Math.floor(Math.random() * 4);
}

function GenerateSequence() {
  var numberGenrated = RandomNumber();
  $("#" + buttonArray[numberGenrated]).fadeIn(100).fadeOut(100).fadeIn(100);
  SoundPlay(buttonArray[numberGenrated]);
  pattern = pattern.concat(buttonArray[numberGenrated]);
  $("h1").text("Level " + level);
  level++;
}

function SoundPlay(button) {
  var audio = new Audio("sounds/" + button + ".mp3");
  audio.play();
}

document.addEventListener("keydown", function() {
  if (!started) {
    GenerateSequence();
    started = true;
  }
});

function Animation(id){
  $("#" + id).addClass("pressed");
  setTimeout(function() {
    $("#" + id).removeClass("pressed");
  }, 100);
}

$(".btn").click(function() {

  if (started) {
    SoundPlay(this.id);
  Animation(this.id);
    if (this.id == pattern[i]) {

      if (i == pattern.length - 1) {
        flag = 0;
        setTimeout(function() {
          GenerateSequence();
        }, 1000)

        i = 0;
      }
      if (flag != 0) {
        i++;
      }
      flag = 1;


    } else {
      $("h1").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      var lost = new Audio("sounds/wrong.mp3");
      lost.play();
      setTimeout(function() {
        $("body").removeClass("game-over")
      }, 500)
      level = 1;
    pattern=[];
      started = false;
    }
  }

});
