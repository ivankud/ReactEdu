import { Console } from "../components";

export function isValidJson(json) {    
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}

