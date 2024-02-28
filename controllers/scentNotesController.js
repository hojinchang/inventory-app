const ScentNote = require("../models/cologne");

const asyncHandler = require("express-async-handler");

// Diplay list of all ScentNotes
exports.scentnote_list = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: ScentNote list");
});

// Display detail page for specific ScentNote
exports.scentnote_detail = asyncHandler(async(req, res, next) => {
    res.send(`NOT IMPLEMENTED: ScentNote detail: ${req.params.id}`);
});

// Display ScentNote create form on GET
exports.scentnote_create_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: ScentNote create GET");
});

// Handle ScentNote create on POST
exports.scentnote_create_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: ScentNote create POST");
});

// Display ScentNote delete form on GET
exports.scentnote_delete_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: ScentNote delete GET");
});

// Handle ScentNote delete on POST
exports.scentnote_delete_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: ScentNote delete POST");
});

// Display ScentNote update form on GET
exports.scentnote_update_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: ScentNote update GET");
});

// Handle ScentNote update on POST
exports.scentnote_update_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: ScentNote update POST");
});