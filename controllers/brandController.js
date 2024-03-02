const Brand = require("../models/brand");
const Cologne = require("../models/cologne");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Brands
exports.brand_list = asyncHandler(async(req, res, next) => {
    const allBrands = await Brand.find()
                            .sort({ name: 1 })
                            .exec();
    
    res.render("brandList", {
        title: "All Brands in Stock",
        brandList: allBrands
    });
});

// Display detail page for specific Brand
exports.brand_detail = asyncHandler(async(req, res, next) => {
    const [brand, colognesByBrand] = await Promise.all([
        Brand.findById(req.params.id).exec(),
        Cologne.find({ brand: req.params.id }, "name description scentNotes").populate("scentNotes").exec()
    ]);

    if (brand === null) {
        // No results
        const err = new Error("Brand Not Found");
        err.status = 404;
        return next(err);
    }

    res.render("brandDetail", {
        title: "Brand Detail",
        brand: brand,
        colognesByBrand: colognesByBrand
    })
});

// Display Brand create form on GET
exports.brand_create_get = asyncHandler(async(req, res, next) => {
    res.render("brandForm", {
        title: "Create Brand",
        brand: null,
        errors: []
    })
});

// Handle Brand create on POST
exports.brand_create_post = [
    body("name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Name must be specified"),
    body("country")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Country must be specified"),
    body("yearEstablished")
        .trim()
        .isInt({ mine:1700, max: new Date().getFullYear() })
        .withMessage("Year must be a valid number between 1700 and the current year"),
    
    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);
        const brand = new Brand({ 
            name: req.body.name,
            countryOfOrigin: req.body.country,
            yearEstablished: req.body.yearEstablished
        });

        if (!errors.isEmpty()) {
            res.render("brandForm", {
                title: "Create Brand",
                brand: brand,
                errors: errors.array()
            });
            return;
        } else {
            const brandExists = await Brand.findOne({ name: req.body.name })
                                        .collation({ locale: "en", strength: 2 })
                                        .exec();
            if (brandExists) {
                res.redirect(brandExists.url);
            } else {
                await brand.save();
                res.redirect(brand.url);
            }
        }
    })
]

// Display Brand delete form on GET
exports.brand_delete_get = asyncHandler(async(req, res, next) => {
    const [brand, allColognesByBrand] = await Promise.all([
        Brand.findById(req.params.id).exec(),
        Cologne.find({ brand: req.params.id }, "name description scentNotes")
            .populate("scentNotes")
            .exec()
    ]);

    if (brand === null) {
        // Brand doesnt exist
        res.redirect("/catalog/brands");
    }

    res.render("brandDelete", {
        title: "Delete Brand",
        brand: brand,
        colognesByBrand: allColognesByBrand
    });

});

// Handle Brand delete on POST
exports.brand_delete_post = asyncHandler(async(req, res, next) => {
    const [brand, allColognesByBrand] = await Promise.all([
        Brand.findById(req.params.id).exec(),
        Cologne.find({ brand: req.params.id }, "name description scentNotes")
            .populate("scentNotes")
            .exec()
    ]);

    if (allColognesByBrand.length > 0) {
        // The brand has colognes, render the same as the GET request
        res.render("brandDelete", {
            title: "Delete Brand",
            brand: brand,
            colognesByBrand: allColognesByBrand
        });
        return;
    } else {
        // Brand has no colognes, delete the brand
        await Brand.findByIdAndDelete(req.body.brand);
        res.redirect("/catalog/brands");
    }
});

// Display Brand update form on GET
exports.brand_update_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Brand update GET");
});

// Handle Brand update on POST
exports.brand_update_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Brand update POST");
});