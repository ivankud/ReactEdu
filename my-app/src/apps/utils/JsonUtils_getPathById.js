/** находит часть объекта по параметру tag и возвращает его
 * @param {object} json - исходный объект
 * @param {numeric} id - индификатор поиска, по которому находит часть объекта
 * @returns {object} - сам объект или внутрення его часть, в зависимости от индификатора посика
 * @description проходится по структуре "исходный", проверяя атрибуты через Object.keys - если находит атрибут "id" и он совпадает с входным параметром "индификатор поиска",
 *              если в верхнем слое атрибутов не нашлось нужного значения, то идет поиск по вложенным объектам, которые хранятся в атрибуте "children" запуская поиск рекурсивно, 
 *              если в следующем слое нашлось нашлось несколько объектов с нужным индфикатором, то выйдет сообщение об ошибке в консоль, но при этом в качестве результата скорее всего будет возвращен последний найденный объект
 *              p.s. если потребуется более подробно определить нахождение объекта, то придется пропрабатывать алгорит и дорабатывать функцию
 */

function getPathLoopById(json, id, currentTargetPATH){
    let targetPATH='';
    let targetJSON;
    Object.keys(json).forEach(key=>{
        if(json[key]===id && key==='id') {
            targetPATH = currentTargetPATH;
        }
    })
    if(targetJSON === undefined) {
        if(json.hasOwnProperty('children')) {
            json["children"].forEach((child, index) => {
                let vTemp = `${currentTargetPATH}${(currentTargetPATH&&'>')}children>${index}`;
                // console.log(vTemp) 
                let tempTargetPATH = getPathLoopById(child,id,vTemp)
                if(tempTargetPATH) {
                    if(targetJSON) console.error(`Найдено несколько объектов с заданным id - ${id}`)
                    targetPATH = tempTargetPATH;
                }
            });
        }
    }
    return targetPATH;
}

export function getPathById(json, id){
    return getPathLoopById(json, id,'');
}