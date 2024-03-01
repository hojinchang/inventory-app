const Brand = require("../models/brand");
const Cologne = require("../models/cologne");

const asyncHandler = require("express-async-handler");

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
    res.send("NOT IMPLEMENTED: Brand create GET");
});

// Handle Brand create on POST
exports.brand_create_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Brand create POST");
});

// Display Brand delete form on GET
exports.brand_delete_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Brand delete GET");
});

// Handle Brand delete on POST
exports.brand_delete_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Brand delete POST");
});

// Display Brand update form on GET
exports.brand_update_get = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Brand update GET");
});

// Handle Brand update on POST
exports.brand_update_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Brand update POST");
});