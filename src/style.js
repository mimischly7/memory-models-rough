const merge = require("deepmerge");
const {config} = require("./config");

// Built-in style for drawing text on canvas (if no custom style is provided by the user)
const default_text_style = {'fill': config.text_color, 'text-anchor': 'middle',
    'font-family': 'Consolas, Courier', 'font-size': config.font_size};

// Style attributes that (by default) across any type of data
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

// Style attributes that (by default) are apply to each category of data
const category_specific_styles = {
    "collection": {
        text_value: {"fill": config.id_color}
    },
    "primitive": {
        text_value: {"fill": config.value_color}
    },
    "class": {
        text_value: {"fill": config.value_color, "text-anchor" : "begin"}
    },
    "stackframe": {
        text_value: {"fill": config.text_color,  "text-anchor" : "begin"}
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


// Constants used for styles used to define presets.
const HIGHLIGHT_TEXT = {'font-weight': "bolder", 'font-size': "22px"};
const FADE_TEXT = {/*'font-weight': "normal",*/ "fill-opacity": .4};
const HIGHLIGHT_BOX_LINES = {"roughness": 0.2, "strokeWidth" : 4}
const HIGHLIGHT_BOX = {"roughness": 0.2, "strokeWidth" : 4, "fill":"yellow", "fillStyle" : "solid"};
const FADE_BOX_LINES = {'roughness': 2.0, "strokeWidth": 0.5}
const FADE_BOX = {'roughness': 2.0, "strokeWidth": 0.5, "fill":"rgb(247, 247, 247)", "fillStyle" : "solid"};
const HIDE_BOX = {"fill" : "white", "fillStyle" : "solid"};

// Defining the different `preset` options with the constants defined above.
const presets = {
    "highlight": {
        "text_value" : HIGHLIGHT_TEXT,
        "text_id": HIGHLIGHT_TEXT,
        "text_type": HIGHLIGHT_TEXT,
        "box_id": HIGHLIGHT_BOX_LINES,
        "box_type": HIGHLIGHT_BOX_LINES,
        "box_container": HIGHLIGHT_BOX
    },
    "highlight_id": {
        "text_id": HIGHLIGHT_TEXT,
        "box_id": HIGHLIGHT_BOX
    },
    "highlight_type": {
        "text_type": HIGHLIGHT_TEXT,
        "box_type": HIGHLIGHT_BOX
    },
    "fade" : {
        "text_value" : FADE_TEXT,
        "text_id": FADE_TEXT,
        "text_type": FADE_TEXT,
        "box_id": FADE_BOX_LINES,
        "box_type": FADE_BOX_LINES,
        "box_container": FADE_BOX
    },
    "fade_id" : {
        "text_id": FADE_TEXT,
        "box_id": FADE_BOX_LINES,
    },
    "fade_type" : {
        "text_type": FADE_TEXT,
        "box_type": FADE_BOX_LINES,
    },
    "hide": {
        "box_container": HIDE_BOX,
        "box_id": HIDE_BOX,
        "box_type": HIDE_BOX
    },
    "hide_id" : {
        "box_id": HIDE_BOX
    },
    "hide_type": {
        "box_type": HIDE_BOX
    },
    "hide_container": {
        "box_container": HIDE_BOX
    }
}

export {
    populateStyleObject,
    immutable,
    collections,
    primitives,
    presets,
    default_text_style}