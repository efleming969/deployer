var R = require( 'ramda' )

exports.init = function() {
  return []
}

exports.handle = function( state, event ) {
  switch( event.eventType ) {
    case 'DeploymentAdded':
      return R.append( { id: event.data.id }, state )
    default:
      return state
  }
}

exports.add = function( state, data ) {
  return [ { eventType: 'DeploymentAdded', data: data } ]
}

exports.complete = function( state, id ) {
  if ( R.find( R.propEq( 'id', id ), state ) )
    return [ { eventType: 'DeploymentCompleted', data: { id: id } } ]
  else
    return []
}

