//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the
//pixel array.
function ShapeToTool() {
    this.icon = "assets/shapeTo.jpg";
    this.name = "ShapeToTool";

    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;
    var shape = "rect";

    // function to draw an ellipse
    function drawEllipse() {
        //calculate the ellipse parameters
        var centerX = (startMouseX + mouseX) / 2;
        var centerY = (startMouseY + mouseY) / 2;
        var radiusX = abs(mouseX - startMouseX) / 2;
        var radiusY = abs(mouseY - startMouseY) / 2;
        //draw the ellipse
        ellipse(centerX, centerY, radiusX * 2, radiusY * 2);
    }

    // function to draw a triangle
    function drawTriangle() {
        //calculate the vertices of the triangle
        var vertex1 = createVector(startMouseX, startMouseY);
        var vertex2 = createVector(mouseX, mouseY);
        var vertex3 = createVector(startMouseX - (mouseX - startMouseX), mouseY);
        //draw the triangle
        triangle(vertex1.x, vertex1.y, vertex2.x, vertex2.y, vertex3.x, vertex3.y);
    }

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
                //draw the shape
                shape === "rect"
                    ? rect(
                        startMouseX,
                        startMouseY,
                        mouseX - startMouseX,
                        mouseY - startMouseY
                    )
                    : shape === "ellipse"
                        ? drawEllipse()
                        : shape === "triangle"
                            ? drawTriangle()
                            : alert("No shape selected");
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
    //toggle the line of symmetr between horizonatl to vertical
    this.populateOptions = function () {
        select(".options").html(
            `<select id='shapeSelector' class='w-fit text-lg font-medium bg-white text-black p-1 px-4 rounded-lg drop-shadow-lg hover:scale-90'>
      <option value='rect'>Rectangle</option>
      <option value='ellipse'>Ellipse</option>
      <option value='triangle'>Triangle</option>
      </select>`
        );
        // add an event listener to the select element
        select("#shapeSelector").changed(() => {
            shape = select("#shapeSelector").value();
        });
    };
}