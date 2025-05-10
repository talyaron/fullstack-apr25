let counterButton = 0;
function happyBirthdatCounter() {
  if (counterButton < 10) {
    confetti();
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