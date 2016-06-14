var TestCore = require( 'lymph-test/lib/Core' )

var logger = {
  log: function( msg, a, b ) {
    if ( a == undefined && b == undefined )
      console.log( msg )
    else
      console.log( msg, a, b )
  }
}

var whenDone = TestCore.run( logger )( 'UnitTests', {
  'extractGithubProps': function( when ) {
      var Utils = require( './Utils' )

      when( {
        'extracting incomplete properties': function( then ) {
            var obj = {
              'x-github-event': '1'
            , 'x-github-delivery': '2'
            }

            var rst = Utils.extractGithubProps( obj )

            then( { 'should return an error message':
              [ rst.toString() , 'Either.Left("x-hub-signature is required")' ] 
            } )
          }
        , 'extracting complete properties': function( then ) {
            var obj = {
              'x-hub-signature': '1'
            , 'x-github-event': '2'
            , 'x-github-delivery': '3'
            }

            var rst = Utils.extractGithubProps( obj )

            then( { 'should return the properties':
              [ rst.value
              , { xHubSignature: '1', xGithubEvent: '2', xGithubDelivery: '3' }
              ]
            } )
          }
      } )
  }

, 'event store': function( test ) {
    var EventStore = require( './EventStore' )
    var SQLite = require( 'sqlite3' )
    var db = new SQLite.Database( './tmp/testing.db' )

    EventStore.setup( db )

    test( {
      'recording an event': function( assert ) {
        EventStore.put( db, [ { eventType: 'Fooed', eventId: '1' } ],
          function() {
            db.all( 'select * from events', function( error, rows ) {
              db.run( 'delete from events', function( error ) {
                assert( {
                  'number of events': [ rows.length, 1 ],
                  'event type': [ rows[ 0 ].eventType, 'Fooed' ],
                  'event id': [ rows[ 0 ].eventId, '1' ]
                } )
              } )
            } )
          } )
      }
    } )
  }

} )

whenDone( function() { } )

