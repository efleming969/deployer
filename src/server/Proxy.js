var Proxy = require( 'http-proxy' )

var proxy = Proxy.createProxyServer( {} )

exports.create = function( req, res ) {
  proxy.web( req, res, { target: '' } )
}

