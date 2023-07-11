const express = require("express");
const { addUserValidation } = require("../../../../models");
const { getAllUsers, postUser } = require("../../../controllers");

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/addUser", addUserValidation, postUser);

module.exports = router;
