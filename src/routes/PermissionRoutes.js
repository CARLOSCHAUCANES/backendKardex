const {Router} = require("express");
const router = Router();
const CONFIGPERMISSION = require("../config/configPermission");
const {savePermission,getPermissionByNameRoute} = require("../controller/PermissionController");
const {verifyToken} = require("../middleware/token");
//TO CREATE A ROUTE WITH ITS PERMISSIONS
router.post(CONFIGPERMISSION.ROUTES.SAVEPERMISSION,verifyToken,savePermission);
router.get(CONFIGPERMISSION.ROUTES.GETPERMISSIONBYNAMEROUTE,verifyToken,getPermissionByNameRoute);
module.exports = router;