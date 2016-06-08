var R = require( 'ramda' )
var DOMPatcher = require( 'lymph-client/src/DOMPatcher' )

var Shell = require( './Shell' )

var renderView = function() {
  DOMPatcher.patch( window.document.body, Shell.view( window.state ) )
}

exports.run = function() {

  console.log( 'Main#run' )

  document.body.innerHTML = ''

  window.state = Shell.init()
  window.requestAnimationFrame( renderView )

  window.addEventListener( 'domain', function( domEvent ) {
    window.state = Shell.update( domEvent.detail )( window.state )
    console.log( window.state )
    window.requestAnimationFrame( renderView )
  } )

}

