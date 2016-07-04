var R = require( 'ramda' )

exports.handle = function( state, event ) {
  switch( event.type ) {
    case 'DeploymentCreated':
      return { id: event.data.id, isComplete: false }
    default:
      return state
  }
}

exports.create = function( state, id ) {
  return [ { type: 'DeploymentCreated' , data: { id: id } } ]
}

