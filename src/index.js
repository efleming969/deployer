var R = require( 'ramda' )
var HTTP = require( 'http' )
var Express = require( 'express' )
var BodyParser = require( 'body-parser' )
var ChildProcess = require( 'child_process' )
var RF = require( 'ramda-fantasy' )

var Success = RF.Either.Left
var Failure = RF.Either.Right

var Utils = require( './Utils' )

var secret = process.env.GITHUB_WEBHOOK_SECRET
var app = Express()


var verifyGithubSignature = BodyParser.json
( { verify: function( req, res, buffer )
    {
      var githubProps = Utils.extractGithubProps( req.headers )

      if ( githubProps.isLeft )
        throw new Error( githubProps.value )
      else if ( githubProps.value.xHubSignature !== Utils.signBlob( secret, buffer ) )
        throw new Error( 'Not valid github signature' )
    }
  }
)

app.post
( "/webhook"
, verifyGithubSignature
, function( req, res )
  {
    console.log( 'all is good' )
    res.send( { "ok": true } )
  }
)

app.post
( "/webhook-test"
, function( req, res )
  {
    var process = ChildProcess.spawn('echo', ['hello']);

    res.statusCode = 200
    res.write( 'started process\n' )

    process.stdout.on
    ( 'data'
    , function( data )
      {
        res.end( 'received: ' + data.toString() )
      }
    )
  }
)

HTTP.createServer( app ).listen( 9000 )
