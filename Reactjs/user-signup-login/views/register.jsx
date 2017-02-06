var React = require('react');
var DefaultLayout = require('./layouts/default');

class Register extends React.Component {
  render() {
    if(!this.props.error_msg == ''){
       var err = this.props.error_msg.map(function(err, i){
            return (<div className='alert alert-danger alert_msg' key={i} id="aa">{err.msg}</div>);
          });
    }
    if(this.props.errors){
      var err = this.props.errors.map(function(err, i){
        return (<div className='alert alert-danger alert_msg' key={i} id="aa">{err.msg}</div>);
      });
    }
    return (
<DefaultLayout>
    {err}
    <div className="container">
        <div className="well">
            <h3 className="page-header"> Register </h3>       
           
                <form method="post" action="/users/register" autoComplete="off">
                      <div className="form-group">
                              <label for="name">Name</label>                         
                              <input type="text" id="name" className="form-control name" placeholder="Name" name="name"  required/>
                      </div>
                      <div className="form-group">
                              <label for="username">Username</label>
                              <input type="text" id="username" className="form-control" placeholder="Username" name="username" required />
                      </div>   
                      <div className="form-group">
                              <label for="email">Email</label>
                              <input type="email" id="email" className="form-control" placeholder="Email" name="email"  required/>
                      </div>
                      <div className="form-group">
                              <label for="password">Password</label>
                              <input type="password" id="password" className="form-control" placeholder="Password" name="password" autocomplete="off" required/>
                      </div>
                      <div className="form-group">
                              <label for="password2">Confirm Password</label>
                              <input type="password" id="password2" className="form-control" placeholder="Confirm Password" name="password2" autocomplete="off" required/ >
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

module.exports = Register;
