var React = require('react');
var DefaultLayout = require('./layouts/default');

class Login extends React.Component {
  render() {
  var msg = '';

        if(this.props.success_msg == 'You are registered and can now login'){
            msg = this.props.success_msg ? <div className="alert alert-success">{this.props.success_msg}</div> : '';
        } else if(this.props.error_msg == '') {
                if(this.props.error == 'Unknown User') {
                    msg = this.props.error ? <div className="alert alert-danger">{this.props.error}</div> : '';
                } else if(this.props.error == 'Invalid password') {
                    msg = this.props.error_msg ? <div className="alert alert-danger">{this.props.error}</div> : '';
                }
        }
    return (
      <DefaultLayout>
        <div className="container">
        <div className="well">
                <div class="row">
                      <div className="col-sm-12">
                          {msg}
                      </div>
                  </div>
                  <h3 className="page-header">Account Login</h3>
                  <form method="post" action="/users/login">
                       <div className="form-group">                            
                        <label for="username">Username</label>
                        <div className="input-group">
                            <div className="input-group-addon"><i className="glyphicon glyphicon-user"></i></div>
                            <input type="text" className="form-control" id="username" name="username" placeholder="Username" required/>      
                          </div>
                      </div>
                        <div className="form-group">                           
                            <label for="password">Password</label>                          
                            
                            <div className="input-group">
                                <div className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></div>
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password" required/>     
                            </div>
                        </div>
                        <div className="form-group text-right">      
                            <button type="submit" className="btn btn-primary btn_submit">Submit</button>
                        </div>
                  </form>
        </div>
        </div>
    </DefaultLayout>
    );
  }
}
module.exports = Login;
