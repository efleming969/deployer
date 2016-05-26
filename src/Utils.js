var Crypto = require( 'crypto' )

exports.signBlob = function signBlob( key, blob )
{
  return 'sha1=' + Crypto.createHmac( 'sha1', key ).update( blob ).digest( 'hex' )
}

