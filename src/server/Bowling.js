var head = function() {
  return `
    <head>
      <title>Sudogs - Bowling</title>

      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

      <link rel="shortcut icon" href="/favicon.ico?v=1">

      <script src="/index.js"></script>
      <script>/*document.addEventListener( "DOMContentLoaded", Main.run )*/</script>
    </head>
  `
}

var body = function() {
  return `
    <body>
      <main id="main" role="main">
        <header>
          <progress max="100" value="0" style="width:100%"></progress>
        </header>
        <section><h1>Bowling</h1></section>
        <footer></footer>
      </main>
    </body>
  `
}

exports.create = function( configData ) {
  return function( req, res ) {
    res.set( 'Content-Type', 'text/html' )
    res.send( '<!doctype html>' + head() + body() )
  }
}

