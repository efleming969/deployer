var R = require( 'ramda' )
var Crypto = require( 'crypto' )
var RF = require( 'ramda-fantasy' )
var Maybe = RF.Maybe
var Either = RF.Either

var hyphenToCamel = exports.hyphenToCamel = function( s ) {
  return s.replace(
    /-([a-z])/g
  , function ( g ) {
      return g[ 1 ].toUpperCase()
    }
  )
}

var stringToError = exports.stringToError = function( x ) {
  return new Error( x )
}

var hasProp = exports.hasProp = R.curry(
  function( name, obj ) {
    if ( obj[ name ] === undefined )
      return Either.Left( name + ' is required' )
    else
      return Either.Right( obj )
  }
)

var objKeysToCamel = exports.objKeysToCamel = function( obj ) {
  return R.zipObj(
    R.map( hyphenToCamel, R.keys( obj ) )
  , R.values( obj )
  )
}

var signBlob = exports.signBlob = function( key, blob ) {
  return 'sha1=' + Crypto
    .createHmac( 'sha1', key )
    .update( blob )
    .digest( 'hex' )
}

var chainHasProp = exports.chainHasProp = function( a, b ) {
  return a.chain( hasProp( b ) )
}

var extractGithubProps = exports.extractGithubProps = function( obj ) {
  var props = [
    'x-hub-signature'
  , 'x-github-event'
  , 'x-github-delivery'
  ]

  return R
    .reduce( chainHasProp, RF.Either.Right( obj ), props )
    .map( R.pick( props ) )
    .map( objKeysToCamel )
}

