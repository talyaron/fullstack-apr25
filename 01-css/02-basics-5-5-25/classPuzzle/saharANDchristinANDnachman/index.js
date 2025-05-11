let counterButton = 0;
function happyBirthdatCounter() {
  if (counterButton < 9) {
    // confetti();
    counterButton++;
    document.getElementById("counterDisplay").textContent = counterButton;
    console.log("counterButton", counterButton);
  } else {
    counterButton = 0;
    document.getElementById("counterDisplay").textContent = counterButton;
    confetti2();
  }
}
function confetti2() {
  var end = Date.now() + 5 * 1000;

  // go Buckeyes!
  var colors = ["#1907e3", "#ffffff", "#e30707", "#07e3d4"];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
function thumbs(x) {
  x.classList.toggle("fa-thumbs-down");
}

function confettiOnButton(){
   document.getElementsByClassName("confetti_button")[0].addEventListener("click",()=>{
      let canvas = document.createElement("canvas")
      canvas.width = 500;
      canvas.height = 800;
      let container = document.getElementsByClassName("button-wraper")[0];
      container.appendChild(canvas);      
      let confetti_button = confetti.create(canvas);
      confetti_button().then(()=> container.removeChild(canvas));
    });
}