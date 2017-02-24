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