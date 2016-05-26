var http = require('http')
var Crypto = require('crypto')
var test = require('tape')

var Utils = require( './Utils' )

test
( 'signed blob and linux sha1sum match'
, function( t )
  {
    var key = 'secret'
    var data = {}

    var blobSignature = Utils.signBlob( key, JSON.stringify( data ) )

    t.equal( 'sha1=c0ef0a097a206319188316f9b1e175c85408694e', blobSignature )
  }
)

// test('Middleware rejects badly signed blob', function(t) {
//     t.plan(3)

//     var obj = { some: 'github', object: 'with', properties: true },
//         json = JSON.stringify(obj),
//         githubMiddleware = GithubMiddleware({ secret: 'bogus' }),
//         req = mkReq(),
//         res

//     req.headers['x-hub-signature'] = signBlob('bogus', json)
//     // break signage by a tiny bit
//     req.headers['x-hub-signature'] = '0' + req.headers['x-hub-signature'].substring(1)
//     req.headers['content-length'] = Buffer.byteLength(json)

//     githubMiddleware(req, res, function(err) {
//         t.ok(err, 'got an error')
//         t.equal(err.message, 'Invalid Signature', 'correct error message')
//         t.equal(err.status, 403, 'correct error status code')
//     })

//     process.nextTick(function() {
//         req.end(json)
//     })
// })
