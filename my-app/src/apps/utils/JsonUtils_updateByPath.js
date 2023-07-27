/** находит часть объекта по параметру tag и возвращает его
 * @param {object} data - исходный объект, подразумевается что это будет "общий объект"
 * @param {string} path - путь в общем объекте, по которому будет произведена замена
 * @param {anytype} value - значение, которое будет записано по заданному пути
 * @description Принимая объект и путь по заданному объекту, пройдясь по заданому пути производит замену. 
 *              Так как объект является по своей сути ссылкой, достаточно всего лишь пройтись и поменять значения ничего не возвращая.
 */

export function updateObject(data,OriginalPath, value) {
    var pathArray = OriginalPath.split(">");
    var pointer = data; // points to the current nested object
    for (var i = 0, len = pathArray.length; i < len; i++) {
        var path = pathArray[i];
        if (pointer.hasOwnProperty(path)) {
            if (i === len - 1) { // terminating condition
                pointer[path] = value;
            } else {
                pointer = pointer[path];
            }
        } else {
            console.log('error path:',OriginalPath)
        }
    }
    // console.log(JSON.stringify(data,null,4))
}