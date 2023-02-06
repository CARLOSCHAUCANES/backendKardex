const CONFIGPROFILE = {
    PROFILECRATED:'Perfil Creado con éxito',
    PROFILENOEXISTS:'Nombre del perfil no existe',
    ACTIVEPROFILE:'active',
    NOREGISTERPROFILES:'No se han registrado perfiles',
    PROFILE:'profile',
    ROUTES:{
        CREATEPROFILE:'/api/createProfile',
        FINDPROFILEBYNAME:'/api/findProfileName',
        LISTACTIVEPROFILES:'/api/listActiveprofiles',
        FINDPROFILEBYID:'/api/findProfileId',
    },
    FIELDS:{
        NAME:'name',
        STATE:'state',
        ID:'_id'
    }
}
module.exports = CONFIGPROFILE;