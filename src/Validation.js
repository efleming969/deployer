var Success = exports.Success = function( value )
{
  this.valid = true
  this.value = value
}

Success.of = function( value )
{
  return new Success( value )
}

Success.prototype.map = function( f )
{
  return new Success( f( this.value ) )
}

Success.prototype.ap = function( a )
{
  return a.map( this.value )
}

Success.prototype.toString = function()
{
  return JSON.stringify( this.value )
}

var Failure = exports.Failure = function( errors )
{
  this.valid = false
  this.errors = errors
}

Failure.of = function( errors )
{
  return new Failure( errors )
}

Failure.prototype.map = function( f )
{
  return this
}

Failure.prototype.ap = function( a )
{
  if ( this.valid )
    return this
  else
    return new Failure( this.errors.concat ( a.errors ) )
}

Failure.prototype.toString = function()
{
  return JSON.stringify( this.errors )
}
