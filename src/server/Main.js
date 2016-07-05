var R = require( 'ramda' )
var HTTP = require( 'http' )
var Express = require( 'express' )
var BodyParser = require( 'body-parser' )
var ChildProcess = require( 'child_process' )
var Bundler = require( 'lymph-bundler' )

var MainView = require( './MainView' )

var app = Express()

app.use( Express.static( 'static' ) )

// app.post( '/applications/releases', function( req, res ) {
//   res.send( 'id:' + req.params.id )
// } )

app.get( '/events', function( req, res ) {
  if ( req.query.version )
    res.send( { version: req.query.version, data: [] } )
  else
    res.send( { version: '0.0.0', data: [] } )
} )

app.get( '/', MainView.renderer() )
app.get( '/index.js', Bundler.create( 'src/client/Main.js' ) )

HTTP.createServer( app ).listen( 8080 )

