//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the
//pixel array.
function LineToTool() {
  this.icon = "assets/lineTo.jpg";
  this.name = "LineTo";

  var startMouseX = -1;
  var startMouseY = -1;
  var drawing = false;
  var width = 1;

  //draws the line to the screen
  this.draw = function () {
    //only draw when mouse is clicked
    if (mouseIsPressed) {
      //if it's the start of drawing a new line
      if (startMouseX == -1) {
        startMouseX = mouseX;
        startMouseY = mouseY;
        drawing = true;
        //save the current pixel Array
        loadPixels();
      } else {
        //update the screen with the saved pixels to hide any previous
        //line between mouse pressed and released
        updatePixels();
        //draw the line
        strokeWeight(width);
        line(startMouseX, startMouseY, mouseX, mouseY);
      }
    } else if (drawing) {
      //save the pixels with the most recent line and reset the
      //drawing bool and start locations
      loadPixels();
      drawing = false;
      startMouseX = -1;
      startMouseY = -1;
    }
  };

  //when the tool is deselected update the pixels to just show the drawing and
  //hide the line of symmetry. Also clear options
  this.unselectTool = function () {
    updatePixels();
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
      width = this.value();
      select("#widthShow").html(this.value());
    });
  };
}
