const Cologne = require("../models/cologne");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Site Home Page");
});

// Diplay list of all Colognes
exports.cologne_list = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Cologne list");
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