
export function isValidJson(json) {   
    // console.log('isValidJson>>INPUT TYPE>>',typeof json )
    switch (typeof json ) {
        case 'string': 
            // console.log('isValidJson>>CASE STRING')
            try {
                JSON.parse(json);
                // console.log('isValidJson>>RESULT>>',true)
                return true;
            }
            catch (error) {
                // console.log('isValidJson>>ERROR>>',error)
                return false;
            }
            break;
        case 'object' :
            // console.log('isValidJson>>CASE OBJECT')
            try {
                JSON.parse(JSON.stringify(json));
                // console.log('isValidJson>>RESULT>>',true)
                return true;
            }
            catch (error) {
                // console.log('isValidJson>>ERROR>>',error)
                // console.log('isValidJson>>RESULT>>',false)
                return false;
            }
            break;
        default :
            // console.log('isValidJson>>NOT PROCESSED 2')
            break;
    }
}