const ScentNote = require("../models/scentNotes");
const Cologne = require("../models/cologne");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Diplay list of all ScentNotes
exports.scentnote_list = asyncHandler(async(req, res, next) => {
    const allScentNotes = await ScentNote.find()
                            .sort({ name: 1 })
                            .exec();
    
    res.render("scentNoteList", {
        title: "All Scent Notes",
        scentNoteList: allScentNotes
    });
});

// Display detail page for specific ScentNote
exports.scentnote_detail = asyncHandler(async(req, res, next) => {
    const [scentNote, colognesWithScentNote] = await Promise.all([
        ScentNote.findById(req.params.id).exec(),
        Cologne.find({ scentNotes: req.params.id }, "name brand description").populate("brand").exec()
    ]);

    if (scentNote === null) {
        // No results
        const err = new Error("Scent Note Not Found");
        err.status = 404;
        return next(err);
    }

    res.render("scentNoteDetail", {
        title: "Scent Note Detail",
        scentNote: scentNote,
        colognesWithScentNote: colognesWithScentNote
    });
});

// Display ScentNote create form on GET
exports.scentnote_create_get = asyncHandler(async(req, res, next) => {
    res.render("scentNoteForm", { 
        title: "Create Scent Note",
        scentNote: null,
        errors: []
    });
});


// Handle ScentNote create on POST
exports.scentnote_create_post = [
    // Validate and sanitize the scent note field
    body("scentNote", "Scent Note name must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    
    // Process request after validation and sanitization
    asyncHandler(async(req, res, next) => {
        // Extract the validation errors from a request
        const errors = validationResult(req);

        // Create a Scent Note object with escaped and trimmed data
        const scentNote = new ScentNote({ name: req.body.scentNote });

        if (!errors.isEmpty()) {
            // there are errors, so render the form again with sanitized values/error messages
            res.render("scentNoteForm", {
                title: "Create Scent Note",
                scentNote: scentNote,
                errors: errors.array()
            });
            return;
        } else {
            // Data from form is valid
            // Check if Scent Note with same name already exists
            const scentNoteExists = await ScentNote.findOne({ name: req.body.scentNote })
                                            .collation({ locale: "en", strength: 2 })
                                            .exec();
            
            if (scentNoteExists) {
                console.log("it exists");
                res.redirect(scentNoteExists.url);
            } else {
                await scentNote.save();
                res.redirect(scentNote.url);
            }
        }

    })
];


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