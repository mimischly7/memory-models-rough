const {MemoryModel} = require("./memory_model.js");
const {drawAutomated, getSize} = require("./automate.js");
const fs = require("fs");

/**
 * Draw the given objects on the canvas.
 *
 * The format of the array of objects must adhere to the description provided in MemoryModel.drawAll.
 *
 * @param {string | object[]} objects - The array of objects to be drawn: this could be passed as an actual JavaScript
 * array of objects, or as a JSON file containing the object array. This array of objects may also include the
 * user-defined style configuration. See the demo files and style.md file for details.
 * @param {boolean} automation - Whether the coordinates (of the objects on the canvas) should be automatically
 * generated or manually inputted.
 * @param {Object} configuration - The configuration (display settings) defined by the user.
 *                          This is also the place to define `sort_by` ("height" or "id") for the object space.
 *                          NOTE: In the case that automation == true, then the user must define configuration.width,
 *                          as this will be used as the "max canvas width" for the automation process.
 *                          If automation == false, then all configuration properties are optional, and the function
 *                          will still operate even without defining them.
 *
 * @returns {MemoryModel} the produced canvas
 */
function draw(objects, automation, configuration) {
    let objs;

    if (typeof objects === 'string') {
        // Use of fs.readFileSync(<path>, <options>) which synchronously reads and returns a string of the data stored
        // in the file that corresponds to path. It blocks execution of any other code until the file is read.
        const json_string = fs.readFileSync(objects, "utf-8");

        // Since fs.readFileSync returns a string, we then use JSON.parse in order to convert the return JSON string
        // into a valid JavaScript object (we assume that 'path' is the path to a valid JSON file).
        objs = JSON.parse(json_string);

    } else {
        objs = objects;
    }


    let m;

    if (automation) {
        if (!configuration.hasOwnProperty("width")){
            throw new Error("Width argument for automated drawing is required.")

        }
        m = drawAutomated(objs, configuration.width, configuration)

    } else {

        // Dynamically determining the width of the canvas, in case one has not been provided.
        if (!configuration.hasOwnProperty("width")) {

            let rightmost_obj;
            let rightmost_edge = 0;

            for (const obj of objs) {
                const width = getSize(obj).width;
                const curr_edge = obj.x + width;
                if ( curr_edge > rightmost_edge) {
                    rightmost_edge = curr_edge;
                    rightmost_obj = obj;
                }
            }
            configuration.width = rightmost_edge + 100;
        }

        // Dynamically determining the height of the canvas, in case one has not been provided.
        if (!configuration.hasOwnProperty("height")) {

            let downmost_obj = objs[0];
            let downmost_edge = 0;

            for (const obj of objs) {

                const height = getSize(obj).height;
                const curr_edge = obj.y + height;

                if (curr_edge > downmost_edge){
                    downmost_obj = obj
                    downmost_edge = obj.y + height
                }
            }

            configuration.height = downmost_edge + 100;
        }

        // Instantiating a new MemoryModel object
        m = new MemoryModel({width: configuration.width, height: configuration.height})

        // Invoking the `drawAll` method render the canvas based on `objs`
        m.drawAll(objs)
    }

    return m;

}

export {draw};

