function textTool() {
  this.name = "textTool";
  this.icon = "assets/textTool.jpg";

  var size = 10;
  var string = "Type your text in the input box in the top bar";

  this.draw = function () {
    if (mouseIsPressed) {
      noStroke();
      textSize(size);
      text(string, mouseX, mouseY);
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
      `<input class="text-black text-base w-full p-1" type="text" id="string" placeholder="Type your text here"/>
      <p class="text-lg">Font Size: </p> <input type="range" min="5" max="100" value="5" step="5" id='textSizeSlider' class='w-fit text-lg font-medium bg-white text-black p-1 px-4 rounded-lg drop-shadow-lg' />
      <p class="text-lg" id="textSizeShow">5</p>`
    );

    select("#textSizeSlider").input(function () {
      size = this.value();
      select("#textSizeShow").html(this.value());
    });
    select("#string").input(function () {
      string = this.value();
    });
  };
}
