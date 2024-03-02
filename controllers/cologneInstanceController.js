const CologneInstance = require("../models/cologneInstance");
const Cologne = require("../models/cologne");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Diplay list of all CologneInstances
exports.cologneinstance_list = asyncHandler(async(req, res, next) => {
    const allCologneInstances = await CologneInstance.find()
                                    .sort({ cologne: 1 })
                                    .populate({ path: "cologne", populate: { path: "brand" } })
                                    .exec();

    res.render("cologneInstanceList", {
        title: "List of Cologne Instances in Stock",
        cologneInstanceList: allCologneInstances
    });
});

// Display detail page for specific CologneInstance
exports.cologneinstance_detail = asyncHandler(async(req, res, next) => {
    const cologneInstance = await CologneInstance.findById(req.params.id).populate("cologne").exec();

    if (cologneInstance === null) {
        // No results
        const err = new Error("Cologne Instance Not Found");
        err.status = 404;
        return next(err);
    }

    res.render("cologneInstanceDetail", {
        title: "Cologne Instance Detail",
        cologneInstance: cologneInstance
    })
});

// Display CologneInstance create form on GET
exports.cologneinstance_create_get = asyncHandler(async(req, res, next) => {
    const allColognes = await Cologne.find().sort({ name: 1}).exec();

    res.render("cologneInstanceForm", {
        title: "Create Cologne Instance",
        colognes: allColognes,
        cologneInstance: null,
        errors: []
    });
});

// Handle CologneInstance create on POST
exports.cologneinstance_create_post = [
    body("cologne")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Cologne must be specified"),
    body("batchNumber")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Batch number must be specified")
        .isAlphanumeric()
        .withMessage("Batch number must be alphanumeric"),
    body("price")
        .trim()
        .isNumeric()
        .escape()
        .withMessage("Price must be a numeric value")
        .isFloat({ min: 0, max: 10000 })
        .withMessage("Price must be between 0 and 10000"),
    body("size")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Price must be specified"),

    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);

        const cologneInstance = new CologneInstance({
            cologne: req.body.cologne,
            batchNumber: req.body.batchNumber,
            price: req.body.price,
            size: req.body.size
        });

        if (!errors.isEmpty()) {
            const allColognes = await Cologne.find().sort({ name: 1}).exec();

            // Pre-select the cologne select input
            for (const cologne of allColognes) {
                if (cologne.id == cologneInstance.cologne) {
                    cologne.select = "true";
                }
            }

            res.render("cologneInstanceForm", {
                title: "Create Cologne Instance",
                colognes: allColognes,
                cologneInstance: cologneInstance,
                errors: errors.array()
            });
            return;
        } else {
            await cologneInstance.save();
            res.redirect(cologneInstance.url);
        }
    })
];

// Display CologneInstance delete form on GET
exports.cologneinstance_delete_get = asyncHandler(async(req, res, next) => {
    const cologneInstance = await CologneInstance.findById(req.params.id).populate("cologne").exec();

    if (cologneInstance === null) {
        res.redirect("/catalog/cologneinstances");
    }

    res.render("cologneInstanceDelete", {
        title: "Delete CologneInstance",
        cologneInstance: cologneInstance
    });
});

// Handle CologneInstance delete on POST
exports.cologneinstance_delete_post = asyncHandler(async(req, res, next) => {
    await CologneInstance.findByIdAndDelete(req.body.cologneInstance);
    res.redirect("/catalog/cologneinstances");
});

// Display CologneInstance update form on GET
exports.cologneinstance_update_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: CologneInstance update GET");
});

// Handle CologneInstance update on POST
exports.cologneinstance_update_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: CologneInstance update POST");
});