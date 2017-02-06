var React = require('react');
var DefaultLayout = require('./layouts/defaultHome');
class ProfileForm extends React.Component {
  render() {
    var name = this.props.data.name;
    var username = this.props.data.username;
    var email = this.props.data.email;
    var password = this.props.data.password;
    return (
    <html>
        <head>
            <link rel="stylesheet" href="../stylesheets/style.css"/>
        </head>
      <DefaultLayout>
            <div className="container">                
                <div className="well">
                     <h3 className="page-header">Profile</h3>
                <form method="post" action="/users/save" autoComplete="off">
                      <div className="form-group">                         
                            <label for="name">Name</label>                          
                            <input type="text" id="name" className="form-control name" placeholder="Name" name="name"  value={name} required/>
                      </div>
                      <div className="form-group">                         
                            <label for="username">Username</label>
                            <input type="text" id="username" className="form-control" placeholder="Username" name="username" value={username} required />
                      </div>
                      <div className="form-group">                         
                           <label for="email">Email</label>                          
                           <input type="email" id="email" className="form-control" placeholder="Email" name="email"  value={email} required/>
                      </div>
                      <div className="form-group">
                           <label for="password">Password</label>
                           <input type="password" id="password" className="form-control" autoComplete="off" placeholder="Password" name="password" value="" required/>
                      </div> 
                    <div className="form-group text-right"> 
                        <button type="submit" className="btn btn-primary btn_submit">Update</button>
                    </div>

                </form>
                </div>
           </div>
        
      </DefaultLayout>
</html>
    );
  }
}

module.exports = ProfileForm;

