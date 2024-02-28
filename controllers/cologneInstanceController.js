const CologneInstance = require("../models/cologneInstance");

const asyncHandler = require("express-async-handler");

// Diplay list of all CologneInstances
exports.cologneinstance_list = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: CologneInstance list");
});

// Display detail page for specific CologneInstance
exports.cologneinstance_detail = asyncHandler(async(req, res, next) => {
    res.send(`NOT IMPLEMENTED: CologneInstance detail: ${req.params.id}`);
});

// Display CologneInstance create form on GET
exports.cologneinstance_create_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: CologneInstance create GET");
});

// Handle CologneInstance create on POST
exports.cologneinstance_create_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: CologneInstance create POST");
});

// Display CologneInstance delete form on GET
exports.cologneinstance_delete_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: CologneInstance delete GET");
});

// Handle CologneInstance delete on POST
exports.cologneinstance_delete_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: CologneInstance delete POST");
});

// Display CologneInstance update form on GET
exports.cologneinstance_update_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: CologneInstance update GET");
});

// Handle CologneInstance update on POST
exports.cologneinstance_update_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: CologneInstance update POST");
});