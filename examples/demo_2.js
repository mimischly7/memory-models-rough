const { MemoryModel } = require("../dist/memory_models_rough.node")

const m1 = new MemoryModel({ width: 1300, height: 1100 })
const m2 = new MemoryModel({ width: 1300, height: 1100 })

// A sample list of objects to be used as an argument for the 'drawAll' function.
const objs = [
    {isClass: true, x: 25, y:200, name: "__main__", id: 82, value: {lst1: 82, lst2: 84, p: 99, d: 10, t: 11}, stack_frame: true},
    {isClass: true, x: 350, y:10, name: "Person", id: 99, value: {age: 12, name: 17}, stack_frame: false},
    {isClass: false, x: 350, y: 350, name: "list", id: 82, value: [19, 43, 28, 49]},
    {isClass: false, x: 350, y: 600, name: "list", id: 84, value: [32, 10, 90, 57], show_indexes: true},
    {isClass: false, x: 750, y: 10, name: "int", id: 19, value: 1969},
    {isClass: false, x: 750, y: 250, name: "bool", id: 32, value: true}, // as per the implementation of drawPrimitive
    {isClass: false, x: 750, y: 500, name: "str", id: 43, value: "David is cool"},
    {isClass: false, x: 1050, y: 40, name: "tuple", id: 11, value: [82, 76]},
    {isClass: false, x: 1050, y: 260, name: "set", id: 90, value: [36, 49, 64]},
    {isClass: false, x: 1050, y: 500, name: "dict", id: 10, value: {x: 81, y: 100, z: 121}},
    {isClass: false, x: 750, y: 750, name: "None", id: 13, value: "None"}

]

// -----------------------Demonstration of the 'MemoryModel.drawAll' method-----------------------
m1.drawAll(objs);
m1.save("../docs/images/demo_2A.svg")

// -----------------------Demonstration of the 'MemoryModel.createFromJSON' method-----------------------
// creating a MemoryModel by calling the 'createFromJSON' with the 'sample_json.json' file.
m2.createFromJSON("../docs/sample_json.json");
m2.save("../docs/images/demo_2B.svg"); // saving the resulting MemoryModel object as an svg.
