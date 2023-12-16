let intervalID100;
stopp = 0;
normal = 0;
function Stop() {
  clearInterval(intervalID100);
  document.getElementById("Start").setAttribute("onclick", "Start()");
  document.getElementById("screen").style.animationName = "noscreen";
  stopp = 1;
  anim = 0;
  normal = 2;
  newday= 0;
  if (day == 1 && momo == 1) {
    document.querySelector("body").style =
      "color: gold;";
    document.getElementById("screen").style =
      "background-color: black; border: 2px solid red;";
    document.getElementById("sadom").style =
      "background-color: black; color: gold; border: 2px solid gold";
    document.getElementById("Start").style =
      "background-color: black; color: gold; border: 2px solid gold";
    document.getElementById("Reset").style =
      "background-color: black; color: gold; border: 2px solid gold";
    document.getElementById("Start").innerHTML = "Start";
    document.querySelector("body").style.backgroundColor="black"
  } else {
    document.getElementById("Start").style.backgroundColor =
      "rgb(162, 206, 95)";

    document.getElementById("screen").style.borderColor = "red";
    document.getElementById("Start").innerHTML = "Start";
  }
}
anim = 0;
function Start() {
  normal = 1;
  stopp = 0;
  anim = 1;
  document.getElementById("screen").style.animationName = "screen";
  ///میکرو ثانیه
  intervalID100 = setInterval(() => {
    const num = document.getElementById("sadom").innerHTML;
    let plus = Number(num) + 1;
    document.getElementById("sadom").innerHTML = plus;
    document.getElementById("Start").innerHTML = "Stop";
    document.getElementById("Start").style.backgroundColor = "red";

    if (num >= 99) {
      ///ثانیه
      document.getElementById("sadom").innerHTML = 0;

      const num1 = document.getElementById("sec").innerHTML;
      let plus = Number(num1) + 1;
      document.getElementById("sec").innerHTML = plus;
      document.getElementById("Start").innerHTML = "Stop";
      document.getElementById("Start").style.backgroundColor = "red";

      if (num1 >= 59) {
        /// دقیقه
        document.getElementById("sec").innerHTML = 0;

        const num2 = document.getElementById("min").innerHTML;
        let plus = Number(num2) + 1;
        document.getElementById("min").innerHTML = plus;

        if (num2 >= 59) {
          document.getElementById("min").innerHTML = 0;
        } else {
        }
        if (num2 >= 59) {
          /// ساعت
          document.getElementById("sec").innerHTML = 0;

          const num3 = document.getElementById("hour").innerHTML;
          let plus = Number(num3) + 1;
          document.getElementById("hour").innerHTML = plus;

          if (num1 >= 99) {
            document.getElementById("hour").innerHTML = 0;
          } else {
          }
        } else {
        }
      } else {
      }
    } else {
      document.getElementById("Start").setAttribute("onclick", "Stop()");
    }
  }, 10);
}

function Reset() {
  normal = 0;
  newday = 1;
  document.getElementById("sadom").innerHTML = 0;
  document.getElementById("sec").innerHTML = 0;
  document.getElementById("min").innerHTML = 0;
  document.getElementById("hour").innerHTML = 0;
  document.getElementById("screen").style.borderColor = "lightskyblue";
}

function sadom() {
  alert("Microsecond || 0.01");
}

/// حالت شب
day = 0;
momo = 0;
function mode() {
  if (day == 0) {
    document.getElementById("screen").style = "background-color: black;";
    document.querySelector("body").style =
      "color: gold;";

    if (normal == 0) {
    } else {
      if (stopp == 1) {
        if (anim == 0 && stopp == 1) {
          document.getElementById("screen").style =
            "background-color: black; border: 2px solid red;";
        } else {
        }
      } else {
        document.getElementById("screen").style.animationName = "screen";
      }
    }

    document.getElementById("mode").style = "background-image: url(pic/sun.svg); background-color: transparent ; filter: invert(69%) sepia(98%) saturate(587%) hue-rotate(358deg) brightness(105%) contrast(108%);";
    document.getElementById("me").style.color = "white";
    document.getElementById("sadom").style =
      "background-color: black; color: gold; border: 2px solid gold;";
    document.getElementById("Start").style =
      "background-color: black; color: gold; border: 2px solid gold";
    document.getElementById("Reset").style =
      "background-color: black; color: gold; border: 2px solid gold";
    document.querySelector("body").style.backgroundColor="black"
    day = 1;
    momo = 1;
  } else {
    document.getElementById("screen").style = "background-color: ; border: ;";
    document.querySelector("body").style = "background-color: ; color: ;";

    if (normal == 0) {
    } else {
      if (stopp == 1) {
        if (anim == 0 && stopp == 1) {
          document.getElementById("screen").style =
            "background-color: ; border: 2px solid red;";
        } else {
        }
      } else {
        document.getElementById("screen").style.animationName = "screen";
      }
    }

    document.getElementById("mode").style = "background-image: ; background-color: ; filter: ;";
    document.getElementById("me").style.color = ""
    document.getElementById("sadom").style =
      "background-color: ; color: ; border: ";
    document.getElementById("Start").style =
      "background-color: ; color: ; border: ";
    document.getElementById("Reset").style =
      "background-color: ; color: ; border: ";

    document.getElementById("Start").style.backgroundColor =
      "rgb(162, 206, 95)";
    document.getElementById("Start").innerHTML = "Start";
    day = 0;
    momo = 0;
  }
}

// get the h1 element by its id
var h1 = document.getElementById ("me");
// add a click event listener to the h1 element
h1.addEventListener ("click", function () {
  // create a temporary input element
  var input = document.createElement ("input");
  // append it to the document body
  document.body.appendChild (input);
  // set its value to the text of the h1 element
  input.value = h1.textContent;
  // select its value
  input.select ();
  // copy it to the clipboard
  document.execCommand ("copy");
  // remove it from the document body
  document.body.removeChild (input);
  // show an alert message


  // Get the browser language
var userLang = navigator.language || navigator.userLanguage;

// Define a list of supported languages
var langs = ['fa-IR'];

// Check if the user language is in the list
if (langs.includes(userLang)) {
  // If yes, display an alert box with a message in that language
  alert("متن در کلیپ بورد کپی شد!");
} else {
  // If no, display an alert box with a message in English
  alert("The text has been copied to the clipboard");
}
});

// clock
setInterval(()=>{
  const time = document.querySelector(".display #time");
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let day_night = "AM";
  if(hours > 12){
    day_night = "PM";
    hours = hours - 12;
  }
  if(seconds < 10){
    seconds = "0" + seconds;
  }
  if(minutes < 10){
    minutes = "0" + minutes;
  }
  if(hours < 10){
    hours = "0" + hours;
  }
  time.textContent = hours + ":" + minutes + ":" + seconds + " "+ day_night;
});