const express = require("express");
const router = express.Router();

const useStatus = require("../controllers/userStatus");

router.post("/:user_id", useStatus.createUserStatus);
router.put("/:userId", useStatus.updateUserStatus);
router.get("/:userId", useStatus.getUserStatus);

module.exports = router;
