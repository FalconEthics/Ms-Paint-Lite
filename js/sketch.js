//global variables that will store the toolbox colour palette
//and the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;
// to toggle the color pallate
let toggleButton;
let divToToggle;

function setup() {
  //create a canvas to fill the content div from index.html
  canvasContainer = select("#content");
  var c = createCanvas(
    canvasContainer.size().width,
    canvasContainer.size().height
  );
  c.parent("content");

  // logic to toggle the color pallate
  // Assign the button and div elements to variables
  toggleButton = select("#toggleButton");
  divToToggle = select(".hide-me");

  // Added a click event listener to the button
  toggleButton.mousePressed(toggleDiv);
  c.mousePressed(hideDiv);

  //create helper functions and the colour palette
  helpers = new HelperFunctions();
  colourP = new ColourPalette();

  //create a toolbox for storing the tools
  toolbox = new Toolbox();

  //add the tools to the toolbox.
  toolbox.addTool(new FreehandTool());
  toolbox.addTool(new LineToTool());
  toolbox.addTool(new SprayCanTool());
  toolbox.addTool(new mirrorDrawTool());
  // added by me
  toolbox.addTool(new ShapeToTool());
  toolbox.addTool(new eraserTool());
  toolbox.addTool(new textTool());
  background(255);
}

function toggleDiv() {
  // Check if the div is currently visible
  if (divToToggle.style("display") === "none") {
    // If hidden, show the div
    divToToggle.style("display", "grid");
  } else {
    // If visible, hide the div
    divToToggle.style("display", "none");
  }
}

function hideDiv() {
  divToToggle.style("display", "none");
}

function draw() {
  //call the draw function from the selected tool.
  //hasOwnProperty is a javascript function that tests
  //if an object contains a particular method or property
  //if there isn't a draw method the app will alert the user
  if (toolbox.selectedTool.hasOwnProperty("draw")) {
    toolbox.selectedTool.draw();
  } else {
    alert("it doesn't look like your tool has a draw method!");
  }
}
