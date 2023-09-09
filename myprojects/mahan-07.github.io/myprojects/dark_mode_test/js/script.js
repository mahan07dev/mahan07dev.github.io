let i = 0;

function DN() {
  if (i == 0) {
    document.getElementById("p").style =
      "background-image: linear-gradient(to right,black, black);";
    document.getElementById("child").style =
      "color: lightblue; background-image: linear-gradient(black,black,black,black,black,black);";
    document.getElementById("butt").style =
      "background-image: repeating-linear-gradient(to right ,black 2% ,black 10%); color: lightblue; border: 2px solid lightblue;";
    document.getElementById("butt2").style =
      "background-image: repeating-linear-gradient(to right ,black 2% ,black 10%); color: lightblue; border: 2px solid lightblue;";
    document.getElementById("butt3").style =
      "background-image: repeating-linear-gradient(to right ,black 2% ,black 10%); color: lightblue; border: 2px solid lightblue;";
    document.getElementById("butt4").style =
      "background-image: repeating-linear-gradient(to right ,black 2% ,black 10%); color: lightblue; border: 2px solid lightblue;";
    document.getElementById("butt").innerHTML = "حالت روز";
    document.getElementById("butt2").setAttribute("onclick", "DN2()");
    i = 1;
  } else {
    document.getElementById("p").style =
      "background-image: linear-gradient(to right,blue, red);";
    document.getElementById("child").style =
      "color: black; background-image: linear-gradient(blue,yellow,green,red,brown,black);";
    document.getElementById("butt").style =
      "background-image: repeating-linear-gradient(to right ,lightblue 2% ,rgb(0, 183, 255) 10%); color: black; border: 2px solid lightblue;";
    document.getElementById("butt2").style =
      "background-image: repeating-linear-gradient(to right ,lightblue 2% ,rgb(0, 183, 255) 10%); color: black; border: 2px solid lightblue;";
    document.getElementById("butt3").style =
      "background-image: repeating-linear-gradient(to right ,lightblue 2% ,rgb(0, 183, 255) 10%); color: black; border: 2px solid lightblue;";
    document.getElementById("butt4").style =
      "background-image: repeating-linear-gradient(to right ,lightblue 2% ,rgb(0, 183, 255) 10%); color: black; border: 2px solid lightblue;";
    document.getElementById("butt").innerHTML = "حالت شب";
    document.getElementById("butt2").setAttribute("onclick", "DN2()");
    i = 0;
  }
}

function DN2() {
  if (i == 1) {
    document.getElementById("p").style =
      "background-image: linear-gradient(to right,black, black);";
    document.getElementById("child").style =
      "color: gold; background-image: linear-gradient(black,black,black,black,black,black);";
    document.getElementById("butt").style =
      "background-image: repeating-linear-gradient(to right ,black ,black); color: gold; border: 2px solid gold;";
    document.getElementById("butt2").style =
      "background-image: repeating-linear-gradient(to right ,black ,black); color: gold; border: 2px solid gold;";
    document.getElementById("butt3").style =
      "background-image: repeating-linear-gradient(to right ,black ,black); color: gold; border: 2px solid gold;";
    document.getElementById("butt4").style =
      "background-image: repeating-linear-gradient(to right ,black ,black); color: gold; border: 2px solid gold;";
    document.getElementById("butt").innerHTML = "آبی";
    document.getElementById("butt2").setAttribute("onclick", "DN2_New()");
    i = 0;
  } else {
    alert("این گزینه فقط در حالت شب آبی در دسترس است.");
  }
}

function DN2_New() {
  if (i == 1 && i == 0) {
    document.getElementById("p").style =
      "background-image: linear-gradient(to right,black, black);";
    document.getElementById("child").style =
      "color: gold; background-image: linear-gradient(black,black,black,black,black,black);";
    document.getElementById("butt").style =
      "background-image: repeating-linear-gradient(to right ,black ,black); color: gold; border: 2px solid gold;";
    document.getElementById("butt2").style =
      "background-image: repeating-linear-gradient(to right ,black ,black); color: gold; border: 2px solid gold;";
    document.getElementById("butt3").style =
      "background-image: repeating-linear-gradient(to right ,black ,black); color: gold; border: 2px solid gold;";
    document.getElementById("butt4").style =
      "background-image: repeating-linear-gradient(to right ,black ,black); color: gold; border: 2px solid gold;";
    document.getElementById("butt").innerHTML = "آبی";
  } else {
    alert("حالت طلایی فعال است. « درصورت غیرفعال کردن ، به حالت آبی برگردید »");
  }
}

let b = 0;

function DN3() {
  if (b == 0) {
    document.querySelector("h1").style.fontFamily = "yekan";
    document.querySelector("div").style.fontFamily = "yekan";
    document.getElementById("butt").style.fontFamily = "yekan";
    document.getElementById("butt2").style.fontFamily = "yekan";
    document.getElementById("butt3").style.fontFamily = "yekan";
    document.getElementById("butt4").style.fontFamily = "yekan";
    document.querySelector("h6").innerHTML = "yekan";

    b = 1;
  } else {
    document.querySelector("h1").style.fontFamily = "YekanBakhBold";
    document.querySelector("div").style.fontFamily = "YekanBakhBold";
    document.getElementById("butt").style.fontFamily = "YekanBakhBold";
    document.getElementById("butt2").style.fontFamily = "YekanBakhBold";
    document.getElementById("butt3").style.fontFamily = "YekanBakhBold";
    document.getElementById("butt4").style.fontFamily = "YekanBakhBold";
    document.querySelector("h6").innerHTML = "YekanBakhBold";
    document.getElementById("butt3").setAttribute("onclick", "DN4()");
    b = 0;
  }
}

function DN4() {
  if (b == 0) {
    document.querySelector("h1").style.fontFamily = "YekanBakhHeavy";
    document.querySelector("div").style.fontFamily = "YekanBakhHeavy";
    document.getElementById("butt").style.fontFamily = "YekanBakhHeavy";
    document.getElementById("butt2").style.fontFamily = "YekanBakhHeavy";
    document.getElementById("butt3").style.fontFamily = "YekanBakhHeavy";
    document.getElementById("butt4").style.fontFamily = "YekanBakhHeavy";
    document.querySelector("h6").innerHTML = "YekanBakhHeavy";
    b = 1;
  } else {
    document.querySelector("h1").style.fontFamily = "YekanBakhMedium";
    document.querySelector("div").style.fontFamily = "YekanBakhMedium";
    document.getElementById("butt").style.fontFamily = "YekanBakhMedium";
    document.getElementById("butt2").style.fontFamily = "YekanBakhMedium";
    document.getElementById("butt3").style.fontFamily = "YekanBakhMedium";
    document.getElementById("butt4").style.fontFamily = "YekanBakhMedium";
    document.querySelector("h6").innerHTML = "YekanBakhMedium";
    document.getElementById("butt3").setAttribute("onclick", "DN5()");
    b = 0;
  }
}

function DN5() {
  if (b == 0) {
    document.querySelector("h1").style.fontFamily = "FiraCode-Regular";
      document.querySelector("div").style.fontFamily = "FiraCode-Regular";
      document.getElementById("butt").style.fontFamily = "FiraCode-Regular";
      document.getElementById("butt2").style.fontFamily = "FiraCode-Regular";
      document.getElementById("butt3").style.fontFamily = "FiraCode-Regular";
      document.getElementById("butt4").style.fontFamily = "FiraCode-Regular";
      document.querySelector("h6").innerHTML = "FiraCode-Regular";
    b = 1;
  } else {
    document.querySelector("h1").style.fontFamily = "FiraCode-Retina";
      document.querySelector("div").style.fontFamily = "FiraCode-Retina";
      document.getElementById("butt").style.fontFamily = "FiraCode-Retina";
      document.getElementById("butt2").style.fontFamily = "FiraCode-Retina";
      document.getElementById("butt3").style.fontFamily = "FiraCode-Retina";
      document.getElementById("butt4").style.fontFamily = "FiraCode-Retina";
      document.querySelector("h6").innerHTML = "FiraCode-Retina";
    document.getElementById("butt3").setAttribute("onclick", "DN6()");
    b = 0;
  }
}
  function DN6() {
    if (b == 0) {
        document.querySelector("h1").style.fontFamily = "vazir-b";
        document.querySelector("div").style.fontFamily = "vazir-b";
        document.getElementById("butt").style.fontFamily = "vazir-b";
        document.getElementById("butt2").style.fontFamily = "vazir-b";
        document.getElementById("butt3").style.fontFamily = "vazir-b";
        document.getElementById("butt4").style.fontFamily = "vazir-b";
        document.querySelector("h6").innerHTML = "vazir-bold";
        document.getElementById("butt3").setAttribute("onclick", "DN3()");
      b = 0;
    } else {
      b = 0;
    }
}
/*بخش برای ترجمه  */
t = 0;
function tran() {
  if (t == 0) {
    document.querySelector("h1").innerHTML = "Click To Change Color";
    document.getElementById("butt4").innerHTML = "EN";
    t = 1;
  } else {
    document.querySelector("h1").innerHTML = "برای تغییر رنگ ضربه بزنید";
    document.getElementById("butt4").innerHTML = "FA";
    t = 0;
  }
} 
