// Define database variables
var database = firebase.database().ref();
var scoresRef = database.child('scores');
usersRef = database.child('users');

var character_length = 17;
var index = 0;
var letters =  $("#input_text").val();
var started = false;
var current_string = letters.substring(index, index + character_length);

var wordcount = 0;

$("#target").text(current_string);
$(window).keypress(function(evt){
  if(!started){
    start();
    started = true;
  }
  evt = evt || window.event;
  var charCode = evt.which || evt.keyCode;
  var charTyped = String.fromCharCode(charCode);
  if(charTyped === letters.charAt(index)){
    if(charTyped == " "){
      wordcount ++;
      $("#wordcount").text(wordcount);
    }
    
    index ++;
    current_string = letters.substring(index, index + character_length);
    $("#target").text(current_string);
    $("#your-attempt").append(charTyped);
    if(index === letters.length){
      wordcount ++;
      $("#wordcount").text(wordcount);
      $("#timer").text(timer);
      if(timer === 0){
        timer = 1;
      }
      wpm = Math.round(wordcount / (timer / 60));
      $("#wpm").text(wpm);
      accuracy = Math.round((character_length - errors) / character_length * 100);
      $("#accuracy").text(accuracy);
      stop();
      finished();
    }
  }else{
    $("#your-attempt").append("<span class='wrong'>" + charTyped + "</span>");
    errors ++;
    $("#errors").text(errors);
  }
});

var timer = 0, wpm = 0, errors = 0, accuracy = 0, interval_timer;


$("#reset").click(function(){
  reset();
});

$("#pauses").click(function(){
  stop();
  $("#pauses").hide();
  $("#plays").show();
});

$("#plays").click(function(){
  start();
  $("#plays").hide();
  $("#pauses").toggle();
  stop();
});

$("#input_text").change(function(){
  reset();
});

function start(){
  interval_timer = setInterval(function(){
    timer ++;
    $("#timer").text(timer);
    accuracy = Math.round((character_length - errors) / character_length * 100);
    $("#accuracy").text(accuracy);
    wpm = Math.round(wordcount / (timer / 60));
    $("#wpm").text(wpm);
  }, 1000);
}

function stop(){
  clearInterval(interval_timer);
  started = false;
}

function reset(){
  $("#reset").click(function(){
    window.location.reload();
  });
}

function finished(){
  var userName;
  usersRef.child(firebase.auth().currentUser.uid).once('value').then(function(data) {
    userName = data.val().username;
    scoresRef.push().set({
      wpm: wpm,
      accuracy: accuracy,
      user: firebase.auth().currentUser.uid,
      userName: userName
    }).then(function () {
      usersRef.child(firebase.auth().currentUser.uid).child('scores').push().set({
        wpm: wpm,
        accuracy: accuracy
      })
    $("#output").text("Congratulations! Words per minute: " + wpm + " WPM" + "\nWordcount: " + wordcount + "\nErrors:" + errors + "\nAccuracy: " + accuracy + "%");
  });
  }) 
}
