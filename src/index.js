var R = require( 'ramda' )
var HTTP = require( 'http' )
var Express = require( 'express' )
var BodyParser = require( 'body-parser' )
var ChildProcess = require( 'child_process' )

var Utils = require( './Utils' )

var secret = process.env.GITHUB_WEBHOOK_SECRET
var app = Express()

var verifyGithubSignature = BodyParser.json
( { verify: function( req, res, buffer )
    {
      if ( !req.headers['x-hub-signature'] )
        throw new Error( 'No X-Hub-Signature found on request' )

      if ( !req.headers['x-github-event'] )
        throw new Error( 'No X-Github-Event found on request' )

      if ( !req.headers['x-github-delivery'] )
        throw new Error( 'No X-Github-Delivery found on request' )

      var received_sig = req.headers['x-hub-signature']
      var computed_sig = Utils.signBlob( secret, buffer )

      if ( received_sig !== computed_sig )
        throw new Error( 'Not valid Github signature' )
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
