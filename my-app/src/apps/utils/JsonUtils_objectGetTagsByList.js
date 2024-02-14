export function objectGetTagsByList(list, tag){
  let listProperties = [];
  list.forEach((elem)=>{
      if(listProperties.indexOf(elem[tag])===-1) listProperties.push(elem[tag])
  })
  return listProperties;
}