function FreehandTool() {
  //set an icon and a name for the object
  this.icon = "assets/freehand.jpg";
  this.name = "freehand";

  //to smoothly draw we'll draw a line from the previous mouse location
  //to the current mouse location. The following values store
  //the locations from the last frame. They are -1 to start with because
  //we haven't started drawing yet.
  var previousMouseX = -1;
  var previousMouseY = -1;
  var width = 1;

  this.draw = function () {
    //if the mouse is pressed
    if (mouseIsPressed) {
      //check if they previousX and Y are -1. set them to the current
      //mouse X and Y if they are.
      if (previousMouseX == -1) {
        previousMouseX = mouseX;
        previousMouseY = mouseY;
      }
      //if we already have values for previousX and Y we can draw a line from
      //there to the current mouse location
      else {
        strokeWeight(width);
        line(previousMouseX, previousMouseY, mouseX, mouseY);
        previousMouseX = mouseX;
        previousMouseY = mouseY;
      }
    }
    //if the user has released the mouse we want to set the previousMouse values
    //back to -1.
    //try and comment out these lines and see what happens!
    else {
      previousMouseX = -1;
      previousMouseY = -1;
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
