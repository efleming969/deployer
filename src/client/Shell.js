var R = require( 'ramda' )
var HTML = require( 'lymph-client/src/HTML' )

var viewApp = function( app ) {
  return HTML.create( 'li', {}, [ app.name ] )
}

var viewApps = function( apps ) {
  return HTML.create( 'ul', {}, R.map( viewApp, apps ) )
}

var createEvent = function( name, data ) {
  return new CustomEvent( name, 
    { detail: data, bubbles: true, cancelable: true } )
}

var bubbleDomainAs = function( type ) {
  return function( domEvent ) {
    domEvent.target.dispatchEvent(
      createEvent( "domain", { type: type, data: 'one' } ) )
  }
}

var events = {
  Sample: 'sample'
}

exports.init = function() {
  return { apps: [] }
}

exports.update = function( event ) {
  switch( event.type ) {
    case events.Sample: return R.evolve( { apps: R.append( { name: event.data } ) } )
    default:       return R.identity
  }
}

exports.view = function( state ) {
  return HTML.create( 'main', { id: 'main' }
    , [ HTML.create( 'h1', {}, [ 'Deployer' ] )
      , viewApps( state.apps )
      , HTML.create( 'button'
          , { id: 'clickme', on: { click: bubbleDomainAs( events.Sample ) } }
          , [ 'click me' ]
          )
      ]
    )
}

