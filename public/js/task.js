// Define database variables
var database = firebase.database().ref();
var scoresRef = database.child('scores');
usersRef = database.child('users');
var texts = [" Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it", 
  "Should array indices start at 0 or 1? My compromise of 0.5 was rejected without, I thought, proper consideration", 
  "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.", 
  "Good code is its own best documentation.", 
  "Good code is its own best documentation. As you're about to add a comment, ask yourself", "How can I improve the code so that this comment isn't needed?", 
  "Improve the code and then document it to make it even clearer.", 
  "Most software today is very much like an Egyptian pyramid with millions of bricks piled on top of each other, with no structural integrity, but just done by brute force and thousands of slaves.",
  "When someone says, 'I want a programming language in which I need only say what I want done,' give him a lollipop.", 
  "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.",
  "Computers are good at following instructions, but not at reading your mind.",
  "Beware of bugs in the above code; I have only proved it correct, not tried it."
  ];

var random = texts[Math.floor(Math.random() * texts.length)];
$("#input_text").val(random);

var character_length = $("#input_text").val().length;
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

$("#pause").click(function(){
  stop();
  
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
  window.location.reload();
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
    $("#output").html("<h5>Congratulations!</h5> <p>Words per minute: " + wpm + " WPM</p><p> Wordcount: " + wordcount + "</p> " + "<p>Errors:" + errors + "</p> " + "<p>Accuracy: " + accuracy + "% </p>");
  })
  })
}