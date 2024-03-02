const Cologne = require("../models/cologne");
const Brand = require("../models/brand");
const ScentNote = require("../models/scentNotes");
const CologneInstance = require("../models/cologneInstance");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
    const [cologne, cologneInstances] = await Promise.all([
        Cologne.findById(req.params.id).populate(["brand", "scentNotes"]).exec(),
        CologneInstance.find({ cologne: req.params.id }).exec()
    ]);

    if (cologne === null) {
        // No results
        const err = new Error("Cologne Not Found");
        err.status = 404;
        return next(err);
    }

    res.render("cologneDetail", {
        title: "Cologne Detail",
        cologne: cologne,
        cologneInstances: cologneInstances
    });

});

// Display Cologne create form on GET
exports.cologne_create_get = asyncHandler(async(req, res, next) => {
    // Get all Brands and Scent Notes, which we can use for the form
    const [allBrands, allScentNotes] = await Promise.all([
        Brand.find().sort({ name: 1 }).exec(),
        ScentNote.find().sort({ name: 1 }).exec()
    ]);

    res.render("cologneForm", {
        title: "Create Cologne",
        brands: allBrands,
        scentNotes: allScentNotes,
        cologne: null,
        errors: []
    });
});

// Handle Cologne create on POST
exports.cologne_create_post = [
    // Convert the scent note to an array
    (req, res, next) => {
        if (!Array.isArray(req.body.scentNote)) {
            req.body.scentNote = typeof req.body.scentNote === "undefined" ? [] : [req.body.scentNote]
        }
        next();
    },

    body("name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Name must be specified"),
    body("brand")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Brand must be specified"),
    body("scentNotes.*")
        .escape(),
    body("description")
        .trim()
        .isLength({ min: 5 })
        .escape()
        .withMessage("Description must be at least 5 words"),

    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);

        const cologne = new Cologne({
            name: req.body.name,
            brand: req.body.brand,
            scentNotes: req.body.scentNotes,
            description: req.body.description
        });

        if (!errors.isEmpty()) {
            const [allBrands, allScentNotes] = await Promise.all([
                Brand.find().sort({ name: 1 }).exec(),
                ScentNote.find().sort({ name: 1 }).exec()
            ]);

            // Pre-select the brand select input
            for (const brand of allBrands) {
                if (brand.id == cologne.brand) {
                    brand.select = "true";
                }
            }
            
            // Pre-check the scent notes checkbox inputs for user to fill the form out again
            for (const scentNote of allScentNotes) {
                if (cologne.scentNotes.includes(scentNote.id)) {
                    scentNote.checked = "true";
                }
            }

            res.render("cologneForm", {
                title: "Create Cologne",
                brands: allBrands,
                scentNotes: allScentNotes,
                cologne: cologne,
                errors: errors.array()
            });
            return;
        } else {
            const cologneExists = await Cologne.findOne({ name: req.body.name });

            if (cologneExists) {
                res.redirect(cologneExists.url);
            } else {
                await cologne.save();
                res.redirect(cologne.url);
            }
        }
    })
];

// Display Cologne delete form on GET
exports.cologne_delete_get = asyncHandler(async(req, res, next) => {
    const [cologne, allCologneInstances] = await Promise.all([
        Cologne.findById(req.params.id).populate(["brand", "scentNotes"]).exec(),
        CologneInstance.find({ cologne: req.params.id }).exec()
    ]);

    if (cologne === null) {
        res.redirect("/catalog/colognes");
    }

    res.render("cologneDelete", {
        title: "Delete Cologne",
        cologne: cologne,
        cologneInstances: allCologneInstances
    });
});

// Handle Cologne delete on POST
exports.cologne_delete_post = asyncHandler(async(req, res, next) => {
    const [cologne, allCologneInstances] = await Promise.all([
        Cologne.findById(req.params.id).populate(["brand", "scentNotes"]).exec(),
        CologneInstance.find({ cologne: req.params.id }).exec()
    ]);

    if (allCologneInstances.length > 0) {
        res.render("cologneDelete", {
            title: "Delete Cologne",
            cologne: cologne,
            cologneInstances: allCologneInstances
        });
        return;
    } else {
        await Cologne.findByIdAndDelete(req.body.cologne);
        res.redirect("/catalog/colognes");
    }
});

// Display Cologne update form on GET
exports.cologne_update_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Cologne update GET");
});

// Handle Cologne update on POST
exports.cologne_update_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Cologne update POST");
});