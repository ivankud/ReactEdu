
export function getJSONpropertyType(property) {   
    let value = property[Object.keys(property)[0]]
    console.log('value ',value)
    console.log('typeof ',typeof value)
    switch (typeof value ) {
        case 'string': 
            return 'string'
            // break;
        case 'number': 
            return 'number'
            // break;
        case 'boolean': 
            return 'boolean'
            // break;
        default :
            return 'unknown'
            // console.log('isValidJson>>NOT PROCESSED 2')
            // break;
    }
}