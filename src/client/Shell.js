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

var bubbleDomain = function( type, data ) {
  return function( domEvent ) {
    domEvent.target.dispatchEvent(
      createEvent( "domain", { type: type, data: data } ) )
  }
}

var bubbleDomainValue = function( type ) {
  return function( domEvent ) {
    domEvent.target.dispatchEvent(
      createEvent( "domain", { type: type, data: domEvent.target.value } ) )
  }
}

var events = {
  NameSubmitted: 0,
  NameChanged: 1
}

var createNewEntry = function( data ) {
  return R.evolve( { apps: R.append( { name: data.name } ) }, data )
}

exports.init = function() {
  return { apps: [], name: '' }
}

exports.update = function( event ) {
  switch( event.type ) {
    case events.NameSubmitted:
      return createNewEntry
    case events.NameChanged:
      return R.evolve( { name: R.always( event.data ) } )
    default:
      return R.identity
  }
}

var logit = function( x ) { console.log( x ) }

exports.view = function( state ) {
  return HTML.create( 'main', { id: 'main' }
    , [ HTML.create( 'h1', {}, [ 'Deployer' ] )
      , viewApps( state.apps )
      , HTML.create( 'button'
          , { id: 'clickme', on: { click: bubbleDomain( events.NameSubmitted ) } }
          , [ 'click me' ]
          )
      , HTML.create( 'input', { on: { input: bubbleDomainValue( events.NameChanged ) } }, [] )
      ]
    )
}

