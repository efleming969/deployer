var R = require( 'ramda' )
var HTTP = require( 'http' )
var Express = require( 'express' )
var BodyParser = require( 'body-parser' )
var ChildProcess = require( 'child_process' )
var Bundler = require( 'lymph-bundler' )
var Docker = require( 'dockerode' )

var Utils = require( './Utils' )
var MainView = require( './MainView' )

var app = Express()

var startDockerContainer = function( callback ) {

  var docker = new Docker( { protocol:'http', host: '127.0.0.1', port: 4243 } )

  var containerOptions = {
    Image: 'sudogs/webowler:1.4.5',
    PortBindings: { '8080/tcp': [ { HostPort: '8081' } ] },
  }

  docker.createContainer( containerOptions, function( error, container ) {
    container.start( function( error, data ) {
      if ( error )
        res.send( 'oops' + error.toString() )
      else
        res.send( data )
    } )
  } )
}

app.use( Express.static( '.' ) )

app.post( '/commands/:id', function( req, res ) {
  res.send( 'id:' + req.params.id )
} )

app.get( '/events', function( req, res ) {
  res.send( 'version:' + req.params.version )
} )

app.get( '/' , MainView.renderer() )
app.get( '/index.js' , Bundler.create( 'src/client/Main.js' ) )

HTTP.createServer( app ).listen( 8080 )

