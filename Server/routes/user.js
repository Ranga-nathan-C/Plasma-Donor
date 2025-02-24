const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.post("/:user_id/profile", userController.completeProfile);
router.post("/:user_id/medical", userController.submitMedicalInfo);
router.post("/:user_id/verify", userController.submitVerification);
router.post("/:user_id/consent", userController.saveConsent);
router.post("/:user_id/community", userController.saveCommunity);

module.exports = router;
