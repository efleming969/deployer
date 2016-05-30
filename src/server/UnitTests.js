var R = require( 'ramda' )
var TestCore = require( 'lymph-test/lib/Core' )
var ListLogger = require( 'lymph-test/lib/ListLogger' )

var listLogger = new ListLogger()
var runWithListLogger = TestCore.run( listLogger )

runWithListLogger(
  'Utils'
, { 'extractGithubProps': function( when )
    {
      var Utils = require( './Utils' )

      when(
        { 'extracting incomplete properties': function( then )
          {
            var obj = {
              'x-github-event': '1'
            , 'x-github-delivery': '2'
            }

            var rst = Utils.extractGithubProps( obj )

            then(
              { 'should return an error message':
                  [ rst.toString() , 'Either.Left("x-hub-signature is required")' ] 
              }
            )
          }
        , 'extracting complete properties': function( then )
          {
            var obj = {
              'x-hub-signature': '1'
            , 'x-github-event': '2'
            , 'x-github-delivery': '3'
            }

            var rst = Utils.extractGithubProps( obj )

            then(
              { 'should return the properties':
                  [ rst.value
                  , { xHubSignature: '1', xGithubEvent: '2', xGithubDelivery: '3' }
                  ]
              }
            )
          }
        }
      )
    }
  }
)

console.log( listLogger.messages )

