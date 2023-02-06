const {Router} = require("express");
const router = Router();
const CONFIGPROFILE = require("../config/configProfile");
const {saveProfile,findProfileByName,findProfileById,listprofiles} = require("../controller/ProfileController");
const {verifyToken} = require("../middleware/token");
//TO CREATE A PROFILE FOR A USER
router.get(CONFIGPROFILE.ROUTES.CREATEPROFILE,verifyToken,saveProfile);
router.get(CONFIGPROFILE.ROUTES.FINDPROFILEBYNAME,verifyToken,findProfileByName);
router.get(CONFIGPROFILE.ROUTES.FINDPROFILEBYID,verifyToken,findProfileById);
router.get(CONFIGPROFILE.ROUTES.LISTACTIVEPROFILES,verifyToken,listprofiles);
module.exports = router;