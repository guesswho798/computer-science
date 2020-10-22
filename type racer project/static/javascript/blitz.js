var t = load();
var selector = 0;

setInterval(function () {
  if (document.getElementById("t").value == " ") {
    document.getElementById("t").value = '';
  }

  // cheking each letter and letting the user know he made a mistake
  if (document.getElementById("t").value.length != 0)
    if (t.data.split(' ')[selector].slice(0, document.getElementById("t").value.length) != document.getElementById("t").value)
      document.getElementById("t").style.backgroundColor = "red";
    else
      document.getElementById("t").style.backgroundColor = "white";
}, 1);

document.body.onkeypress = function (e) {

  // checking answer after the space bar is pressed
  if (e.keyCode == 32) {
    check_Word(t);
  }
}

function check_Word(t) {

  var input_box = document.getElementById("t");
  var sentence = t.data;

  // checking if the input is the same as the focused word
  if (input_box.value == sentence.split(' ')[selector]) {

    // advancing the word selector
    selector = selector + 1;
    // clearing the input bar
    input_box.value = '';

    // the sentence diplayed is splited into two elements,
    // the first one is green displaying all the words that were written all ready
    // and the second one is displaying the rest of the sentece in white.
    document.getElementById("green").innerHTML = "";
    document.getElementById("white").innerHTML = "";
    var s3 = sentence.split(' ');
    for (var i = 0; i < s3.length; i++)
      if (i < selector)
        document.getElementById("green").innerHTML += s3[i] + " ";
      else
        document.getElementById("white").innerHTML += s3[i] + " ";
  }

  // disabling input box if sentence is done
  if (selector == sentence.split(' ').length) {
    input_box.style.backgroundColor = "white";
    input_box.disabled = true;
    window.location.href="{{ url_for('home') }}";
  }
}

// loading a sentence into t
function load() {

  var t;
  var n = Math.floor(Math.random() * 5);
  document.getElementById('t').focus();

  // getting a random sentence
  switch (n) {
    case 0:
      t = document.createTextNode("Sometimes you have to just give up and win by cheating");
      break;
    case 1:
      t = document.createTextNode("All you need to do is pick up the pen and begin");
      break;
    case 2:
      t = document.createTextNode("Today arrived with a crash of my car through the garage door");
      break;
    case 3:
      t = document.createTextNode("As he entered the church he could hear the soft voice of someone whispering into a cell phone");
      break;
    case 4:
      t = document.createTextNode("He appeared to be confusingly perplexed");
      break;
  }

  document.getElementById("white").appendChild(t);
  return t;
}