// var R = require( 'ramda' )
// var HTTP = require( 'http' )
// var Express = require( 'express' )
// var BodyParser = require( 'body-parser' )
// var ChildProcess = require( 'child_process' )
// var Bundler = require( 'lymph-bundler' )
// var Docker = require( 'dockerode' )

// var Utils = require( './Utils' )
// var MainView = require( './MainView' )

// var app = Express()

// var startDockerContainer = function( callback ) {

//   var docker = new Docker( { protocol:'http', host: '127.0.0.1', port: 4243 } )

//   var containerOptions = {
//     Image: 'sudogs/webowler:1.4.5',
//     PortBindings: { '8080/tcp': [ { HostPort: '8081' } ] },
//   }

//   docker.createContainer( containerOptions, function( error, container ) {
//     container.start( function( error, data ) {
//       if ( error )
//         res.send( 'oops' + error.toString() )
//       else
//         res.send( data )
//     } )
//   } )
// }

// app.use( Express.static( '.' ) )

// app.post( '/commands/:id', function( req, res ) {
//   res.send( 'id:' + req.params.id )
// } )

// app.get( '/events', function( req, res ) {
//   res.send( 'version:' + req.params.version )
// } )

// app.get( '/' , MainView.renderer() )
// app.get( '/index.js' , Bundler.create( 'src/client/Main.js' ) )

// HTTP.createServer( app ).listen( 8080 )

// Note: using staging server url, remove .testing( ) for production
// var LEX = require( 'letsencrypt-express' ).testing( )
var LEX = require( 'letsencrypt-express' )
var express = require( 'express' )
var app = express( )

app.use( '/', function ( req, res ) {
  res.send( { success: true } )
} )

lexServer = LEX.create( {
  // ~/letsencrypt, /etc/letsencrypt, whatever you want
  configDir: './letsencrypt'
  // your express app (or plain node http app )
, onRequest: app
  // you can provide you own instance of letsencrypt if you need to configure it (with an agreeToTerms callback, for example )
, letsencrypt: null
  // PRODUCTION MODE needs this function, but only if you want automatic registration (usually not necessary) renewals for registered domains will still be automatic
, approveRegistration: function ( hostname, cb ) {  
    cb( null, {
      domains: [hostname]
    , email: 'erick@sudogs.com'
    , agreeTos: true
    } )
  }
} )

lexServer.listen( [80], [443, 5001], function () {
  console.log( "ENCRYPT __ALL__ THE DOMAINS!" )
} )

