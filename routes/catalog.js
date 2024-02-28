const express = require("express");
const router = express.Router();

// Require controller modules
const cologneController = require("../controllers/cologneController");
const brandController = require("../controllers/brandController");
const scentNoteController = require("../controllers/scentNotesController");
const cologneInstanceController = require("../controllers/cologneInstanceController");

// COLOGNE ROUTES  //

// GET catalog home page
router.get("/", cologneController.index);

// GET request for creating a Cologne
router.get("/cologne/create", cologneController.cologne_create_get);

// POST request for creating Cologne
router.post("/cologne/create", cologneController.cologne_create_post);

// GET request to delete Cologne
router.get("/cologne/:id/delete", cologneController.cologne_delete_get);

// POST request to delete Cologne
router.post("/cologne/:id/delete", cologneController.cologne_delete_post);

// GET request to update Cologne
router.get("/cologne/:id/update", cologneController.cologne_update_get);

// POST request to update Cologne
router.post("/cologne/:id/update", cologneController.cologne_update_post);

// GET request for one Cologne
router.get("/cologne/:id", cologneController.cologne_detail);

// GET request for list of all Cologne items
router.get("/colognes", cologneController.cologne_list);

// BRAND ROUTES //

// GET request for creating Brand
router.get("/brand/create", brandController.brand_create_get);

// POST request for creating Brand
router.post("/brand/create", brandController.brand_create_post);

// GET request to delete Brand
router.get("/brand/:id/delete", brandController.brand_delete_get);

// POST request to delete Brand
router.post("/brand/:id/delete", brandController.brand_delete_post);

// GET request to update Brand
router.get("/brand/:id/update", brandController.brand_update_get);

// POST request to update Brand
router.post("/brand/:id/update", brandController.brand_update_post);

// GET request for one Brand
router.get("/brand/:id", brandController.brand_detail);

// GET request for list of all Brand items
router.get("/brands", brandController.brand_list);

// Scent Notes Routes //

// GET request for creating Scent Note
router.get("/scentnote/create", scentNoteController.scentnote_create_get);

// POST request for creating Scent Note
router.post("/scentnote/create", scentNoteController.scentnote_create_post);

// GET request to delete Scent Note
router.get("/scentnote/:id/delete", scentNoteController.scentnote_delete_get);

// POST request to delete Scent Note
router.post("/scentnote/:id/delete", scentNoteController.scentnote_delete_post);

// GET request to update Scent Note
router.get("/scentnote/:id/update", scentNoteController.scentnote_update_get);

// POST request to update Scent Note
router.post("/scentnote/:id/update", scentNoteController.scentnote_update_post);

// GET request for one Scent Note
router.get("/scentnote/:id", scentNoteController.scentnote_detail);

// GET request for list of all Scent Note items
router.get("/scentnotes", scentNoteController.scentnote_list);

// Cologne Instance Routes //

// GET request for creating Cologne Instance
router.get("/cologneinstance/create", cologneInstanceController.cologneinstance_create_get);

// POST request for creating Cologne Instance
router.post("/cologneinstance/create", cologneInstanceController.cologneinstance_create_post);

// GET request to delete Cologne Instance
router.get("/cologneinstance/:id/delete", cologneInstanceController.cologneinstance_delete_get);

// POST request to delete Cologne Instance
router.post("/cologneinstance/:id/delete", cologneInstanceController.cologneinstance_delete_post);

// GET request to update Cologne Instance
router.get("/cologneinstance/:id/update", cologneInstanceController.cologneinstance_update_get);

// POST request to update Cologne Instance
router.post("/cologneinstance/:id/update", cologneInstanceController.cologneinstance_update_post);

// GET request for one Cologne Instance
router.get("/cologneinstance/:id", cologneInstanceController.cologneinstance_detail);

// GET request for list of all Cologne Instance items
router.get("/cologneinstances", cologneInstanceController.cologneinstance_list);

module.exports = router;