var R = require( 'ramda' )
var HTTP = require( 'http' )
var Express = require( 'express' )
var BodyParser = require( 'body-parser' )
var ChildProcess = require( 'child_process' )

var Utils = require( './Utils' )
var MainView = require( './MainView' )

var secret = process.env.GITHUB_WEBHOOK_SECRET
var app = Express()

var jsonVerifier = function( req, res, buffer )
{
  var githubProps = Utils.extractGithubProps( req.headers )

  if ( githubProps.isLeft )
    throw new Error( githubProps.value )
  else if ( githubProps.value.xHubSignature !== Utils.signBlob( secret, buffer ) )
    throw new Error( 'Not valid github signature' )
}

var respondToGithub = function( req, res )
{
  console.log( 'all is good' )
  res.send( { "ok": true } )
}

var kickOffDeploymentScript = function( req, res )
{
  var process = ChildProcess.spawn('echo', ['hello']);

  res.statusCode = 200
  res.write( 'started process\n' )

  process.stdout.on(
    'data'
  , function( data )
    {
      res.end( 'received: ' + data.toString() )
    }
  )
}

app.use( Express.static( '.' ) )

app.get( '/' , MainView.renderer() )

app.post( '/webhook'
  , BodyParser.json( { verify: jsonVerifier } )
  , respondToGithub
  )

app.post( '/webhook-test' , kickOffDeploymentScript )

HTTP.createServer( app ).listen( 8080 )

