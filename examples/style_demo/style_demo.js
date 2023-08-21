/**
 * This file demonstrates the use of the custom styling and usage of presets in a memory model diagram, showing the
 * required structure of the style object.
 *
 * This is a rough demo for illustrating the capabilities of "highlighting" features.
 *
 * SOS: The interface for the style is quite flexible, allowing the user to pass a style in two ways:
 * 1. as an object: e.g. {text_id: {"font-size":"large"}}, or
 * 2. as an array: e.g. ["highlight", {text_type: {"font-weight":"bold"}}]
 *      Note that the array can include both presets and concrete objects (containing features in the format described
 *      in the `explanations/style.md` markdown file.
 *
 * OUTPUT FILES:
 *      - ~/examples/style_demo/style_demo.svg"
 */

const { draw } = require("../../dist/memory_models_rough.node.js");

// Configuration for drawings on the canvas
const configuration = {width: 1300, padding: 30, top_margin: 30, bottom_margin: 40,
    left_margin: 20, right_margin:30, sort_by: "id"
};

const objs = [
    {isClass: true, x: 25, y:200, name: "__main__", id: 82,
        value: {lst1: 82, lst2: 84, p: 99, d: 10, t: 11},
        stack_frame: true,
        style:[{fill : "yellow", stroke: "green", "stroke-opacity":0.9}]  // Notice style is passed in as an array
    },
    {isClass: false, x: 350, y: 350, name: "list", id: 54, value: [19, 43, 28, 49],
        style: {"text_id" : {"font-style": "italic", "font-size":"x-large"}}},
    {isClass: false, x: 350, y: 600, name: "list", id: 84, value: [32, 10, 90, 57], show_indexes: true},
    {isClass: false, x: 750, y: 10, name: "int", id: 19, value: 1969},
    {isClass: false, x: 750, y: 250, name: "bool", id: 32, value: true}, // as per the implementation of drawPrimitive
    {isClass: false, x: 750, y: 500, name: "str", id: 43, value: "David is cool",
        style: "highlight"},
    {isClass: false, x: 1050, y: 40, name: "tuple", id: 11, value: [82, 76]},
    {isClass: false, x: 1050, y: 260, name: "set", id: 90, value: [36, 49, 64]},
    {isClass: false, x: 1050, y: 500, name: "dict", id: 10, value: {x: 81, y: 100, z: 121},
        style: {"text_id" : {"font-style" : "italic"}}}, // Notice that style is passed in as an Object
    {isClass: false, x: 750, y: 750, name: "None", id: 13, value: "None",
        style:{
            "text_value" : {"font-style" : "italic"},
            'box_id': {fill: 'red', fillStyle: "dots"},
            'box_type': {fill: "red", fillStyle: "solid"},
            "box_container": {fill:"black", fillStyle: "solid"}}
    }
]

const m = draw(
    objs,
    true,
    configuration
)

m.save("style_demo.svg")
