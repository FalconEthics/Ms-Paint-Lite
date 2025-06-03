function SprayCanTool() {
  this.name = "sprayCanTool";
  this.icon = "assets/sprayCan.jpg";

  var points = 13;
  var spread = 10;
  var weight = 1;

  this.draw = function () {
    var r = random(5, 10);
    if (mouseIsPressed) {
      for (var i = 0; i < points; i++) {
        strokeWeight(weight);
        point(
          random(mouseX - spread, mouseX + spread),
          random(mouseY - spread, mouseY + spread)
        );
      }
    }
  };

  //when the tool is deselected update the pixels to just show the drawing and
  //hide the line of symmetry. Also clear options
  this.unselectTool = function () {
    //clear options
    select(".options").html("");
  };

  //adds a button and click handler to the options area. When clicked
  //toggle the line of symmetry between horizonatl to vertical
  this.populateOptions = function () {
    select(".options").html(
      `<input type="range" min="1" max="10" value="1" step="1" id='widthSlider' class='w-fit text-lg font-medium bg-white text-black p-1 px-4 rounded-lg drop-shadow-lg' />
      <p id="widthShow">1</p>`
    );

    select("#widthSlider").input(function () {
      weight = this.value();
      select("#widthShow").html(this.value());
    });
  };
}
