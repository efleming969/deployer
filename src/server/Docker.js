var Docker = require( 'dockerode' )

// var startDockerContainer = function( callback ) {

//   var docker = new Docker( { protocol:'http', host: '127.0.0.1', port: 4243 } )

//   var containerOptions = {
//     Image: 'sudogs/webowler:1.4.5',
//     PortBindings: { '8080/tcp': [ { HostPort: '8081' } ] },
//   }

//   docker.createContainer( containerOptions, function( error, container ) {
//     container.start( function( error, data ) {
//       if ( error )
//         res.send( 'oops' + error.toString() )
//       else
//         res.send( data )
//     } )
//   } )
// }

