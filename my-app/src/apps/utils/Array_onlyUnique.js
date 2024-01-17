export default function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}


// usage example:
// var a = ['a', 1, 'a', 2, '1'];
// var unique = a.filter(onlyUnique);
// console.log(unique); // ['a', 1, 2, '1']