// The library for merging js objects (will be used for populating styles)
import deepmerge from "deepmerge";

const merge = require("deepmerge");

const {config} = require("./config.js");

const default_text_style = {'fill': config.text_color, 'text-anchor': 'middle',
    'font-family': 'Consolas, Courier', 'font-size': config.font_size};

const common_style = {
    "text_id" :{"fill": config.id_color,'text-anchor': 'middle',
        'font-family': 'Consolas, Courier', 'font-size': config.font_size},
    "text_type" : {"fill": config.value_color, 'text-anchor': 'middle',
        'font-family': 'Consolas, Courier', 'font-size': config.font_size},
    "text_value": {'text-anchor': 'middle', 'font-family': 'Consolas, Courier',
        'font-size': config.font_size},
    "box_container":{},
    "box_id": {},
    "box_type": {}
};

const category_specific_styles = {
    "collection": {
        text_value: {"fill": config.id_color}
    },
    "primitive": {
        text_value: {"fill": config.value_color}
    },
    "class": {
        text_value: {"fill": config.value_color}
    },
    "stackframe": {
        text_value: {"fill": config.text_color}
    }
}

// Built-in data types
const immutable = ["int", "str", "tuple", "None", "bool", "float", "date"]
const collections = ["list", "set", "tuple", "dict"]

const primitives = ["int", "str", "None", "bool", "float", "date"]

/**
 * Populates a user-passed style object --to the extent needed-- with default data (to adhere to the interface of the
 * style object). Needed to avoid errors of the type "TypeError: Cannot set properties of undefined (setting 'x')", as
 * well as many more.
 * @param {Object} object : the object that represents a Python object the user wants drawn. The style object
 *                          corresponding to 'object' will be extracted be doing object.style.
 * @returns {Object}
 */
function populateStyleObject(object) {

    // STEP 1: We begin with the common default style
    let style_so_far = common_style;


    // Determining under which of the four main categories the object falls, so we can fetch the corresponding
    // default object from the 'category_specific_styles' constant.
    let object_type;


    if (primitives.includes(object.name)) {
        object_type = "primitive"
    } else if (collections.includes(object.name)) {
        object_type = "collection"
    } else if (object.stack_frame) {
        object_type = "stackframe"
    } else { // The object is a class object
        object_type = "class"

    }

    // ~~~~~~~~~~ STEP 2: We then add properties specific to the different type categories ~~~~~~~~~~
    // SOS: This is mandatory because if we were to use the original category_specific_styles[object_type] object, then the
    // assignment obj.style = category_specific_styles[object_type] (or any assignment of the nested objects), would mean that
    // if we change obj.style, then category_specific_styles[object_type] would automatically also change (since they both refer
    // to the same object) which we do not want!
    // (merge returns a new object)
    style_so_far = merge(style_so_far, category_specific_styles[object_type]);  // Merge #1


    // ~~~~~~~~~~ STEP 3: Finally, we complement the current style with any user-supplied properties ~~~~~~~~~~
    // merge the user defined style with the default style
    style_so_far = merge(style_so_far, object.style || {}) // Merge #2

    return style_so_far;
}

/**
 * Returns a deep-copy of the passed object. Does not work if function-objects exist within the passed object.
 * @param {Object} obj - the object to be deep-copied
 * @returns {Object}
 */
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// PRESETS
const specific_presets = {
    'highlight_text': {'font-weight': "bolder", 'font-size': "22px"},
    'fade_text': {/*'font-weight': "normal",*/ 'font-size': "smaller"},
    'rougher_box_lines': {"roughness": 0.2, "strokeWidth" : 4},
    'fade_box_lines': {'roughness': 2.0, "strokeWidth": 0.5},
    'hide_box' : {fill : "white", "fillStyle" : "solid"}
}

const presets = {
    "highlight": {
        "text_value" : specific_presets['highlight_text'],
        "text_id": specific_presets['highlight_text'],
        "text_type": specific_presets['highlight_text'],
        "box_id": specific_presets['rougher_box_lines'],
        "box_type": specific_presets['rougher_box_lines'],
        "box_container": specific_presets['rougher_box_lines']

    },
    "highlight_id": {
        "text_id": specific_presets['highlight_text'],
        "box_id": specific_presets['rougher_box_lines']
    },
    "highlight_type": {
        "text_type": specific_presets['highlight_type'],
        "box_type": specific_presets['rougher_box_lines']
    },
    "fade" : {
        "text_value" : specific_presets['fade_text'],
        "text_id": specific_presets['fade_text'],
        "text_type": specific_presets['fade_text'],
        "box_id": specific_presets['fade_box_lines'],
        "box_type": specific_presets['fade_box_lines'],
        "box_container": specific_presets['fade_box_lines']
    },
    "hide": {
        "box_container": specific_presets['hide_box'],
        "box_id": specific_presets['hide_box'],
        "box_type": specific_presets['hide_box']
    },
    "hide_id" : {
        "box_id": specific_presets['hide_box']
    },
    "hide_type": {
        "box_type": specific_presets['hide_box']
    },
    "hide_container": {
        "box_container": specific_presets['hide_box']
    }
}

export {populateStyleObject, presets, default_text_style}
