var React = require('react');

class DefaultLayout extends React.Component {

  render() {
    return (
      <html>
        <head>            
            <title>{this.props.title}</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="../stylesheets/style.css"/>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        </head>
        <body>
        <header>
          <div className="container">  
                  <nav>
                    <ul className="nav nav-pills pull-right">

                        <li role="presentation"><a className="btn btn-default" href="/users/login">Login</a></li>
                        <li role="presentation"><a className="btn btn-default" href="/users/register">Register</a></li>

                    </ul>
                  </nav>
                  <h3 className="text-muted"></h3>              
              </div>
              </header>
         {this.props.children}
        </body>
      </html>
    );
  }
}
module.exports = DefaultLayout;
