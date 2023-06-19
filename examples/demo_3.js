const { drawAutomated, separateJSON, getSize, drawAutomatedOtherItems} = require("../dist/automate.js")
const { MemoryModel } = require("../dist/index.js")

const fs = require("fs");

const WIDTH = 1300;

const {objs, canvas_height} = drawAutomatedOtherItems(
    [
        {"isClass": true, "name": "Person", "id": 99, "value": {"age": 12, "name": 17}, "stack_frame": false},
        {"isClass": false, "name": "list", "id": 82, "value": [19, 43, 28, 49]},
        {"isClass": false, "name": "list", "id": 84, "value": [32, 10, 90, 57], "show_indexes": true},
        {"isClass": false, "name": "int", "id": 19, "value": 1969},
        {"isClass": false, "name": "bool", "id": 32, "value": true},
        {"isClass": false, "name": "str", "id": 43, "value": "David is cool"},
        {"isClass": false, "name": "tuple", "id": 11, "value": [82, 76]},
        {"isClass": false, "name": "set", "id": 90, "value": [36, 49, 64]},
        {"isClass": false, "name": "dict", "id": 10, "value": {"x": 81, "y": 100, "z": 121}},
        {"isClass": false, "name": "None", "id": 13, "value": "None"}
    ],
    WIDTH
)

// console.log(objs)

const m = new MemoryModel({width: WIDTH, height: canvas_height});

console.log(objs, canvas_height)
m.drawAll(objs)
m.save("../docs/images/demo_3.svg")

const stringified_objs = JSON.stringify(objs)

fs.writeFileSync("../docs/automated_model.json", stringified_objs)

const m2 = new MemoryModel({width: WIDTH, height: canvas_height});
m2.createFromJSON("../docs/automated_model.json");
m2.save("../docs/images/demo_3B.svg")