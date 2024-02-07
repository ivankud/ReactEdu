import 
{   
    isValidJson,
    getElementById,
    updateObject,
    getPathById,
    objectReverse,
    getJSONpropertyType,
    joinChildrenObjectsInDiv,
    getIdByPath,
    getIdParentByPath,
} from "./JsonUtils";

import {
    dragElement,
    dragNewElementElement,
    justDragElement
} from './DragAndDrop'

import {
    prettyRenderText,
    convertJsonToRenderText,
    convertJsonToRenderClass,
    getChildren,
    getDiv,
    getStyle,
    getButton,
    getInput,
    getLabel,
    getTable,
    alignObjectsHorizontal,
    alignObjectsVertical,
    alignObjectsFullWidth,
    alignObjectsFullHeight,
    joinGroupObjects
} from './Generator'

import {
    onlyUnique
} from './Array';

import {
    selectAndReadFileFromWindow
} from './File'

export {
    /*методы для работы с json*/
    getIdByPath,
    getIdParentByPath,
    joinChildrenObjectsInDiv,
    isValidJson,
    getElementById,
    updateObject,
    getPathById,
    objectReverse,
    getJSONpropertyType,
    dragElement,
    dragNewElementElement,
    justDragElement,
    /*методы выравнивания объектов↓↓↓↓*/    
    alignObjectsHorizontal,
    alignObjectsVertical,
    alignObjectsFullWidth,
    alignObjectsFullHeight,
    /*Методы объединения*/
    // joinGroupObjects,
    /*Для генератора↓↓↓↓*/
    prettyRenderText,
    convertJsonToRenderText,
    convertJsonToRenderClass,
    getChildren,
    getDiv,
    getStyle,
    getButton,
    getInput,
    getLabel,
    getTable,
    /*Для работы с массивами↓↓↓↓*/
    onlyUnique,
    /*Для работы с файлами*/
    selectAndReadFileFromWindow,
}
