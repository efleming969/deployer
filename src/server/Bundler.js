var Utils = require( './Utils' )
var browserify = require( 'browserify' )
var watchify = require( 'watchify' )

var sendErrorTo = function( res, err )
{
  console.log( err.message )
  res.status( 500 ).send( err.message )
  this.emit( 'end' )
}

module.exports = function( file )
{
  var browserifyConfig =
    { debug: true
    , standalone: 'Main'
    , cache: {}
    , packageCache: {}
    , plugin: [ watchify ]
    }

  var browserfier = browserify( browserifyConfig )
    .require( file, { entry: true } )
    .on( 'update' , Utils.log( 'updated: ' + ids ) )
    .on( 'log', R.identity )

  return function( req, res )
  {
    res.set( 'Content-Type' , 'application/javascript' )

    browserfier
      .bundle()
      .on( 'error' , sendErrorTo.bind( this, res ) )
      .pipe( res )
  }
}

