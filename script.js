document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".button");

  buttons.forEach((button) => {
    button.addEventListener("touchstart", function (e) {
      e.preventDefault();
      this.classList.add("pressed");
    });

    ["touchend", "touchcancel"].forEach((evt) =>
      button.addEventListener(evt, function (e) {
        e.preventDefault();
        this.classList.remove("pressed");
      })
    );
  });
});
