var R = require( 'ramda' )
var HTTP = require( 'http' )
var Express = require( 'express' )
var BodyParser = require( 'body-parser' )
var ChildProcess = require( 'child_process' )
var Bundler = require( 'lymph-bundler' )
var Docker = require( 'dockerode' )

var Utils = require( './Utils' )
var MainView = require( './MainView' )

var secret = process.env.GITHUB_WEBHOOK_SECRET
var app = Express()

var jsonVerifier = function( req, res, buffer ) {
  var githubProps = Utils.extractGithubProps( req.headers )

  if ( githubProps.isLeft )
    throw new Error( githubProps.value )
  else if ( githubProps.value.xHubSignature !== Utils.signBlob( secret, buffer ) )
    throw new Error( 'Not valid github signature' )
}

var respondToGithub = function( req, res ) {
  console.log( 'all is good' )
  res.send( { "ok": true } )
}

var kickOffDeploymentScript = function( req, res ) {
  var process = ChildProcess.spawn('echo', ['hello']);

  res.statusCode = 200
  res.write( 'started process\n' )

  process.stdout.on( 'data' , function( data ) {
    res.end( 'received: ' + data.toString() )
  } )
}

app.use( Express.static( '.' ) )

app.post( '/commands/:id', function( req, res ) {
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
} )

app.get( '/events', function( req, res ) {
  res.send( 'version:' + req.params.version )
} )

app.get( '/' , MainView.renderer() )
app.get( '/index.js' , Bundler.create( 'src/client/Main.js' ) )

app.post( '/webhook', BodyParser.json( { verify: jsonVerifier } ), respondToGithub )
app.post( '/webhook-test' , kickOffDeploymentScript )

HTTP.createServer( app ).listen( 8080 )

