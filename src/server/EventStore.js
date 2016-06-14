var sendToCallback = function( callback ) {
  return function( err, data ) {
    callback( data )
  }
}

exports.put = function( db, events, callback ) {
  var stmt = db.prepare( 'INSERT INTO events VALUES (?,?,?,?)' )

  var parameters = function( i ) {
    return [
      events[ i ].parentId
    , events[ i ].eventId
    , events[ i ].eventType
    , JSON.stringify( events[ i ].data )
    ]
  }

  for ( var i = 0; i < events.length; i++ ) {
    stmt.run( parameters( i ) )
  }

  stmt.finalize( callback )
}

exports.get = function( db, parentId, callback ) {
  db.all( 'SELECT * FROM events WHERE parentId = ?',
    parentId,
    sendToCallback( callback ) )
}

exports.getAll = function( db, callback ) {
  db.all( 'SELECT * FROM events', sendToCallback( callback ) )
}

exports.setup = function( db ) {

  var operations = function() {
    var sql = `
      CREATE TABLE IF NOT EXISTS events (
        parentId   VARCHAR
      , eventId   VARCHAR
      , eventType VARCHAR
      , data TEXT
      )
    `

    db.run( sql )
  }

  db.serialize( operations )
}

