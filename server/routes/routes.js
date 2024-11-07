const express = require("express");
const router = express.Router();

// Require controller modules.
const {getAllitem,additem,getOneitem,deleteitem,updateitem}=require("../controllers/controllers")


/// items ROUTES ///

//GET request to fetch all items.
router.get("/", getAllitem);
// GET request for one item.
router.get("/:id", getOneitem);
// POST request for creating a item.
router.post("/add", additem);
// DELETE request for deleting a item.
router.delete("/:id", deleteitem);
// update request for updating a item.
router.patch("/:id", updateitem);
module.exports = router;