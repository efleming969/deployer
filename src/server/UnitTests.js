var R = require( 'ramda' )
var TestCore = require( 'lymph-test/lib/Core' )

var logger = {
  log: function( msg, a, b ) {
    if ( a == undefined && b == undefined )
      console.log( msg )
    else {
      console.log( msg, a, b )
      console.log( '' )
      console.log( '>', msg, a, b )
      console.log( '' )
    }
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

, 'deployments': function( when ) {

    var Deployments = require( './Deployments' )
    var createDeploymentsFrom = R.reduce( Deployments.handle, Deployments.init() )

    when( {

      'adding a deployment': function( then ) {

        var state = createDeploymentsFrom( [] )
        var events = Deployments.add( state, { id: '1' } )

        then( {

          'DeploymentAdded': [
              events
            , [ { eventType: 'DeploymentAdded', data: { id: '1' } } ]
            ]

        } )
      }

    , 'completing an existing deployment': function( then ) {

        var state = createDeploymentsFrom( [
          { eventType: 'DeploymentAdded', data: { id: '1' } }
        ] )

        var events = Deployments.complete( state, '1' )

        then( {
          'DeploymentCompleted': [
              events
            , [ { eventType: 'DeploymentCompleted', data: { id: '1' } } ]
            ]
        } )
      }

    , 'completing a non existing deployment': function( then ) {

        var state = createDeploymentsFrom( [] )
        var events = Deployments.complete( state, '1' )

        then( {
          'nothing': [ events , [] ]
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

