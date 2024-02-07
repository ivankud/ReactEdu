export default function selectAndReadFileFromWindow(setter){
  var input = document.createElement('input');
  input.type = 'file';
  input.onchange = e => {
      var file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function() {
        console.log('Файл прочитан (selectAndReadFileFromWindow)')
        console.log('Содержимое файла:', reader.result);
        setter(reader.result);
      };
      reader.onerror = function() {
        console.log('Ошибка прочтения файла (selectAndReadFileFromWindow)');
        console.log(reader.error);
        setter(null)
      };
  }  
  input.click();
}