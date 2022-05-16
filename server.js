let http  = require('http')
let fs = require('fs')

let app = http.createServer ( function(request,response){
   let url = request.url
   if(request.url!=='/favicon.ico'){
       fs.readFile( __dirname + ( url==='/' ? '/index.html':url ), function( err, data ){
           if( err ){
               console.log( 'file-err',err )
           }else{
               //console.log(data)
               response.end( data )
           }
       });
   }
} ) 



app.listen(8000)
console.log('server is listen on 8000....')
