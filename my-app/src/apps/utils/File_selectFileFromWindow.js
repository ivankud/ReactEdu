export default function selectAndReadFileFromWindow(setter, setterFile){
  var input = document.createElement('input');
  input.type = 'file';
  input.onchange = e => {
      var file = e.target.files[0];
        console.log('file->>',file)
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function() {
        console.log('Файл прочитан (selectAndReadFileFromWindow)')
        console.log('Содержимое файла:', reader.result);
        setter(reader.result);
        setterFile(file)        
      };
      reader.onerror = function() {
        console.log('Ошибка прочтения файла (selectAndReadFileFromWindow)');
        console.log(reader.error);
        setter(null)
        setterFile(null)
      };
  }  
  input.click();
}