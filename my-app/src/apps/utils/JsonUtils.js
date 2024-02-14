// import { Console } from "../components";

import {getElementById} from './JsonUtils_getElementById'
import {isValidJson} from './JsonUtils_isValidJson'
import {updateObject} from './JsonUtils_updateByPath'
import {getPathById } from './JsonUtils_getPathById'
import {objectReverse} from './JsonUtils_objectReverse'
import { getJSONpropertyType } from './JsonUtils_getJSONpropertyType'
import { joinChildrenObjectsInDiv } from './JsonUtils_joinChildrenObjectsInDiv'
import { getIdByPath } from './JsonUtils_getIdByPath'
import { getIdParentByPath } from './JsonUtils_getIdParentByPath'
import { objectGetFlatList } from './JsonUtils_objectGetFlatList'
import { objectGetTagsByList } from './JsonUtils_objectGetTagsByList';

export { 
    
    getElementById,
    isValidJson,
    updateObject,
    getPathById,
    objectReverse,
    getJSONpropertyType,
    joinChildrenObjectsInDiv,
    getIdByPath,
    getIdParentByPath,
    objectGetFlatList,
    objectGetTagsByList,
}
