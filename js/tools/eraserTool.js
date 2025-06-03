function eraserTool() {
  this.name = "eraserTool";
  this.icon = "assets/eraserTool.jpg";

  var diameter = 10;

  this.draw = function () {
    if (mouseIsPressed) {
      noStroke();
      fill(255);
      circle(mouseX, mouseY, diameter);
    }
  };

  //when the tool is deselected update the pixels to just show the drawing and
  //hide the line of symmetry. Also clear options
  this.unselectTool = function () {
    document.getElementById("blackSwatch").click();
    //clear options
    select(".options").html("");
  };

  //adds a button and click handler to the options area. When clicked
  //toggle the line of symmetry between horizonatl to vertical
  this.populateOptions = function () {
    select(".options").html(
      `<input type="range" min="10" max="100" value="10" step="10" id='diameterSlider' class='w-fit text-lg font-medium bg-white text-black p-1 px-4 rounded-lg drop-shadow-lg' />
      <p id="diameterShow">10</p>`
    );

    select("#diameterSlider").input(function () {
      diameter = this.value();
      select("#diameterShow").html(this.value());
    });
  };
}
