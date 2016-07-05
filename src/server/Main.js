var R = require( 'ramda' )
var HTTP = require( 'http' )
var Express = require( 'express' )
var BodyParser = require( 'body-parser' )
var ChildProcess = require( 'child_process' )
var Bundler = require( 'lymph-bundler' )

var MainView = require( './MainView' )
var data = []

var app = Express()

app.use( BodyParser.json() )
app.use( Express.static( 'static' ) )

app.post( '/api/releases', function( req, res ) {
  data.push( req.body )
  res.sendStatus(200)
} )

app.get( '/api/releases', function( req, res ) {
  res.send( data )
} )

app.get( '/events', function( req, res ) {
  if ( req.query.version )
    res.send( { version: req.query.version, data: [] } )
  else
    res.send( { version: '0.0.0', data: [] } )
} )

app.get( '/', MainView.renderer() )
app.get( '/index.js', Bundler.create( 'src/client/Main.js' ) )

HTTP.createServer( app ).listen( 8080 )

