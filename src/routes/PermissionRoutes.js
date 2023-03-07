const {Router} = require("express");
const router = Router();
const CONFIGPERMISSION = require("../config/configPermission");
const {savePermission,getPermissionByNameRoute,getListPermissions,updatePermission} = require("../controller/PermissionController");
const {verifyToken} = require("../middleware/token");
//TO CREATE A ROUTE WITH ITS PERMISSIONS
router.post(CONFIGPERMISSION.ROUTES.SAVEPERMISSION,verifyToken,savePermission);
router.post(CONFIGPERMISSION.ROUTES.GETPERMISSIONBYNAMEROUTE,verifyToken,getPermissionByNameRoute);
router.get(CONFIGPERMISSION.ROUTES.GETLISTPERMISSIONS,verifyToken,getListPermissions);
router.post(CONFIGPERMISSION.ROUTES.UPDATEPERMISSION,verifyToken,updatePermission);
module.exports = router;