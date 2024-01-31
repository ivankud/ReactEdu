// export function getIdByPath(globalObject, path){
//     let vobj = globalObject;
//     path.split('>').slice(0,-2).forEach((partPath)=>{
//         if (isNaN(Number(partPath))) {
//             vobj = vobj[partPath]}
//         else {
//             vobj = vobj[Number(partPath)]
//         }
//     })
//     return vobj.id;
// }

export function getIdByPath(globalObject, path){
    let vtempobj = JSON.parse(JSON.stringify(globalObject));
    path.split('>').slice(0,-2).forEach((partPath)=>{
        if(partPath==="children") {
            vtempobj = vtempobj['children']
        }
        else {
            vtempobj = vtempobj[Number(partPath)]
        }        
    })
    return vtempobj.id;
}