var R = require( 'ramda' )
var HTTP = require( 'http' )
var Express = require( 'express' )
var Rocky = require( 'rocky' )
var BodyParser = require( 'body-parser' )
var ChildProcess = require( 'child_process' )
var Bundler = require( 'lymph-bundler' )
var Docker = require( 'dockerode' )

var Utils = require( './Utils' )
var MainView = require( './MainView' )
var Bowling = require( './Bowling' )

var proxy = Rocky()
var app = Express()

proxy
  .get( '/apps/bowling' )
  .forward( 'http://localhost:8081' )

app.use( proxy.middleware() )
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

// // Note: using staging server url, remove .testing( ) for production
// var LEX = require( 'letsencrypt-express' ).testing( )
// // var LEX = require( 'letsencrypt-express' )

// app.use( '/', function ( req, res ) {
//   res.send( { success: true } )
// } )

// lexServer = LEX.create( {
//   // ~/letsencrypt, /etc/letsencrypt, whatever you want
//   configDir: './letsencrypt'
//   // your express app (or plain node http app )
// , onRequest: app
//   // you can provide you own instance of letsencrypt if you need to configure it (with an agreeToTerms callback, for example )
// , letsencrypt: null
//   // PRODUCTION MODE needs this function, but only if you want automatic registration (usually not necessary) renewals for registered domains will still be automatic
// , approveRegistration: function ( hostname, cb ) {  
//     cb( null, {
//       domains: [hostname]
//     , email: 'erick@sudogs.com'
//     , agreeTos: true
//     } )
//   }
// } )

// lexServer.listen( [80], [443, 5001], function () {
//   console.log( "ENCRYPT __ALL__ THE DOMAINS!" )
// } )

Express().use( Bowling.create() ).listen( 8081  )
