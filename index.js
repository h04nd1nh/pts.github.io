var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let img = new Image();
 fileName = '';
const uploadFile = document.getElementById("upload-file");


//upload File 
uploadFile.addEventListener('change', (e) => {
    const file = document.getElementById("upload-file").files[0];
    const reader = new FileReader();
    if (file) {
        fileName = file.name;
        reader.readAsDataURL(file);
    }

    // them anh
    reader.addEventListener('load', () => {
        img = new Image();
        img.src = reader.result;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0, canvas.width, canvas.height);
            canvas.removeAttribute('data-caman-id');
        }
    });
});


var a = 0;

function doCommand (filter,index) {

}
function formatNumber (value) {
  if (value < -100) value = -100;
  if (value > 100) value = 100;
  value = value.replace(/^0+/, '');
  return value;
}

document.querySelectorAll('input[type="range"]').forEach(item => {
      item.addEventListener('change',function() {
        var filterName = item.name;
        var index = item.value;
        var value = (((item.value)/100))*15;
        var change =  value-a;
          document.querySelectorAll(`[name=${filterName}]`)[1].value = index; 

          var query;

          if (filterName=='red' || filterName=='green' || filterName=='blue') {
            var _query;
            if (filterName == 'red') {
              _query = 
              `
                red : ${change},
                green : 0,
                blue : 0  
              `            
            }
            if (filterName == 'green') {
              _query = 
              `
                red : 0,
                green : ${change},
                blue : 0  
              `            
            }
            if (filterName == 'blue') {
              _query = 
              `
                red : 0,
                green : 0,
                blue : ${change}  
              `            
            }
            query =   new Function(`Caman("#canvas",img, function () {
              this.channels({
                ${_query}
              }).render();
            })`);  
            
          } else {
            query = new Function(`Caman("#canvas",img,function() {
              this.${filterName}(${change}).render();
           })`);

          }
        
         
         query();
          a = value;
      })

      
 })

document.querySelectorAll('input[type="number"]').forEach(item => {
  item.addEventListener('change',function() {
    if (item.type = "number") {
      var index = item.value;
      var value = (((item.value)/100))*15;
      index = formatNumber(item.index);
      if (index == '') {
        index = 0;  
      } 
      var filterName = item.name;
      var change =  value -a;
        document.querySelectorAll(`[name=${item.name}]`)[0].value = index;
        document.querySelectorAll(`[name=${item.name}]`)[1].value = index;

        var query;

        if (filterName=='red' || filterName=='green' || filterName=='blue') {
          query =   new Function(`Caman("#canvas",img, function () {
            this.channels({
              red: 10,
              green: -5,
              blue: 2
            }).render();
          })`);
      }

        query = new Function(`Caman("#canvas",img,function() {
            this.${filterName}(${change}).render();
         })`);
         query();
      
    }   
  })
})