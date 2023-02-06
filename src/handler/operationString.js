const upperCaseObject = (datos)=>{
    for(let key in datos){
        datos[key] = String.prototype.toUpperCase(datos[key]);
    }
    return datos;
}

const upperCaseString = (dato)=>{
    let datoM = dato.trim();
    dato = datoM.toUpperCase();
    return dato;
}

module.exports = {upperCaseObject,upperCaseString};