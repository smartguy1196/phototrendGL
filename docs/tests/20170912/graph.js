function log( input ){
  document.getElementById( "log" ).innerHTML += input + "<br/>";
}

function loadGraph( name, image ){
  var two_d = document.createElement( "canvas" );
  var context = two_d.getContext( '2d' );
  context.drawImage( image, 0, 0 );
  var imageData = context.getImageData( 0, 0, image.width - 1, image.height - 1).data;
  log( name + "- imageData:" );
  log( <pre>" + JSON.stringify( imageData, null, '\t' ) + "</pre>" );
}

function renderImages( uploads )
{
  log( "Checking files..." );
  if( uploads && uploads[0] )
  {
    log( "Files detected: " + uploads.length + " files" );
    for( var i = 0; i < uploads.length; i++ )
    {
      log( uploads[i].name + ": Checking file extension..." );
      if( (/\.(png|jpeg|jpg)$/i).test(uploads[i].name) )
      {
        log( uploads[i].name + ": File is graphable!" );
        log( uploads[i].name + ": Preparing image for graphing..." );
        var img = new Image;
        (function (val) {
          img.addEventListener( "load", function (){
            log( val + ": Graphing..." );
            loadGraph( val, this );
            log( val + ": Image graphed" );
            window.URL.revokeObjectURL( this.src );
          })
        })(uploads[i].name);
        log( uploads[i].name + ": Load handler set" );
        img.src = window.URL.createObjectURL(uploads[i]);
      }
      else if( (/\.(gif|apng)$/i).test(uploads[i].name) )
      {
        log( uploads[i].name +": Image extension not supported at this time!" );
      }
      else
      {
        log( uploads[i].name +": Extension not supported!" );
      }
    }
  }
  else
  {
    log( "No files provided during upload to renderImage()" );
  }
}

document.getElementById( "upload" ).addEventListener("change", function(){
  log( "Input detected!" );
  renderImages( this.files );
});
