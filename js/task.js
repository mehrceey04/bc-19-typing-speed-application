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
      stop();
      finished();
    }
  }else{
    $("#your-attempt").append("<span class='wrong'>" + charTyped + "</span>");
    errors ++;
    $("#errors").text(errors);
  }
});

var timer = 0;
var wpm = 0;
var errors = 0;
var interval_timer;

$("#reset").click(function(){
  reset();
});

$("#pause").click(function(){
  stop();
  $("#pause").hide();
  $("#play").show();
});

$("#play").click(function(){
  start();
  $("#play").hide();
  $("#pause").toggle();
  stop();
});

$("#input_text").change(function(){
  reset();
});

function start(){
  interval_timer = setInterval(function(){
    timer ++;
    $("#timer").text(timer);
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
  $("#output").text("Congratulations! Words per minute: " + wpm + " WPM" + "\nWordcount: " + wordcount + "\nErrors:" + errors);
}
