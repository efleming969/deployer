var TestCore = require( 'lymph-test/lib/Core' )
var BrowserLogger = require( 'lymph-test/lib/BrowserLogger' )

var logger = {
  log: function( msg, a, b ) {
    if ( a == undefined && b == undefined )
      console.log( msg )
    else
      console.log.apply( console, BrowserLogger.formatMessage( msg, a, b ) )
  }
}

var whenDone = TestCore.run( logger )( 'UnitTests', {
  'sanity': function( when ) {
    when( {
      'things happen': function( then ) {
        then( { '': [ true ] } )
      } 
    } )
  }
} )

whenDone( function() {
  console.log( 'done' )
} )

