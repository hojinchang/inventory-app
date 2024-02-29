const Cologne = require("../models/cologne");
const Brand = require("../models/brand");
const ScentNote = require("../models/scentNotes");
const CologneInstance = require("../models/cologneInstance");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async(req, res, next) => {
    const [nColognes, nCologneInstances, nBrands, nScentNotes] = await Promise.all([
        Cologne.countDocuments({}).exec(),
        CologneInstance.countDocuments({}).exec(),
        Brand.countDocuments({}).exec(),
        ScentNote.countDocuments({}).exec(),
    ]);

    res.render("index", {
        title: "Local Cologne Store Home",
        nColognes: nColognes,
        nCologneInstances: nCologneInstances,
        nBrands: nBrands,
        nScentNotes: nScentNotes
    });
});

// Diplay list of all Colognes
exports.cologne_list = asyncHandler(async(req, res, next) => {
    const allColognes = await Cologne.find({}, "name brand")
                            .sort({ brand: 1 })
                            .populate("brand")
                            .exec();
    
    res.render("cologneList", { 
        title: "List of Colognes in Stock", 
        cologneList: allColognes
    });
});

// Display detail page for specific Cologne
exports.cologne_detail = asyncHandler(async(req, res, next) => {
    res.send(`NOT IMPLEMENTED: Cologne detail: ${req.params.id}`);
});

// Display Cologne create form on GET
exports.cologne_create_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Cologne create GET");
});

// Handle Cologne create on POST
exports.cologne_create_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Cologne create POST");
});

// Display Cologne delete form on GET
exports.cologne_delete_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Cologne delete GET");
});

// Handle Cologne delete on POST
exports.cologne_delete_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Cologne delete POST");
});

// Display Cologne update form on GET
exports.cologne_update_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Cologne update GET");
});

// Handle Cologne update on POST
exports.cologne_update_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Cologne update POST");
});