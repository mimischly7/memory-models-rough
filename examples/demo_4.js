const { drawAutomated, separateJSON, getSize, drawAutomatedOtherItems} = require("../dist/automate.js")
const { MemoryModel } = require("../dist/index.js")
const fs = require("fs");

const WIDTH = 1300;

const m = drawAutomated(
    "../docs/automated_json.json",
    WIDTH
)

console.log(m);

m.save("../docs/images/demo_4.svg")

    // [
    // {"isClass": true, "name": "__main__", "id": 82, "value": {"lst1": 82, "lst2": 84, "p": 99, "d": 10, "t": 11}, "stack_frame": true},
    //     {"isClass": true, "name": "Person", "id": 99, "value": {"age": 12, "name": 17}, "stack_frame": false},
    //     {"isClass": true, "name": "Person", "id": 99, "value": {"age": 12, "name": 17}, "stack_frame": false},
    //     {"isClass": false, "name": "list", "id": 82, "value": [19, 43, 28, 49]},
    //     {"isClass": false, "name": "list", "id": 84, "value": [32, 10, 90, 57], "show_indexes": true},
    //     {"isClass": false, "name": "int", "id": 19, "value": 1969},
    //     {"isClass": false, "name": "bool", "id": 32, "value": true},
    //     {"isClass": false, "name": "str", "id": 43, "value": "David is cool"},
    //     {"isClass": false, "name": "tuple", "id": 11, "value": [82, 76]},
    //     {"isClass": false, "name": "set", "id": 90, "value": [36, 49, 64]},
    //     {"isClass": false, "name": "dict", "id": 10, "value": {"x": 81, "y": 100, "z": 121}},
    //     {"isClass": false, "name": "None", "id": 13, "value": "None"}
    // ]