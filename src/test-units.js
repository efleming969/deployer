var R = require( 'ramda' )
var Test = require('tape')

Test(
  'utils'
, function( ctx ) {
    var Utils = require( './Utils' )

    ctx.test(
      'singing a blob'
    , function( assert ) {
        var key = 'secret'
        var data = { name: 'foo' }

        var blobSignature = Utils.signBlob( key, JSON.stringify( data ) )

        assert.equal( 'sha1=8a6b282b5f2bac982a71f9ef94d755b6880800a4', blobSignature )
        assert.end()
      }
    )

    ctx.test(
      'extracting github props without sig should produce an error'
    , function( assert ) {
        var obj = {
          'x-github-event': '1'
        , 'x-github-delivery': '2'
        }

        var rst = Utils.extractGithubProps( obj )

        assert.equal( rst.isLeft, true )

        assert.equal(
          rst.toString()
        , 'Either.Left(Error: x-hub-signature is required)'
        )

        assert.end()
      }
    )

    ctx.test(
      'extracting complete github props should produce the props'
    , function( assert ) {
        var obj = {
          'x-hub-signature': '1'
        , 'x-github-event': '2'
        , 'x-github-delivery': '3'
        }

        var rst = Utils.extractGithubProps( obj )

        assert.deepEqual(
          rst.value
        , { xHubSignature: '1', xGithubEvent: '2', xGithubDelivery: '3' }
        )

        assert.end()
      }
    )

    ctx.test(
      'user validation'
    , function( assert ) {

        var createUser = R.curry(
          function( name, email, dob ) {
            return { name: name, email: email, dob: dob }
          }
        )

        var Validation = require( './Validation' )
        var Valid = Validation.Success
        var Invalid = Validation.Failure

        var isName = function( value ) {
          return /^[\d\w]+$/.test( value )
            ? Valid.of( value )
            : Invalid.of( [ 'must not be empty' ] )
        }

        var isDate = function( value ) {
          return /^\d{2}\/\d{2}\/\d{4}$/.test( value )
            ? Valid.of( value )
            : Invalid.of( [ 'must be valid date' ] )
        }

        var isEmail = function( value ) {
          return  /^[^@]+@[^@]+$/.test( value )
            ? Valid.of( value )
            : Invalid.of( [ 'must be valid email address' ] )
        }

        var u = Valid.of( createUser )
          .ap( isName( 'joe' ) )
          .ap( isEmail( 'joe@mail.com' ) )
          .ap( isDate( '01/01/2000' ) )

        assert.equal(
          JSON.stringify(
            { name: 'joe', email: 'joe@mail.com', dob: '01/01/2000' }
          )
        , u.toString()
        )
        assert.end( )
      }
    )

    ctx.end()
  }
)

