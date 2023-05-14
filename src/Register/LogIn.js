import React, { Component } from 'react'

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email : "",
      password :"",
    };


   this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
   
    const{email,password} = this.state;

    if (!this.validateEmail(email)) {
      console.log('Invalid email');
      return;
    }

    // Password validation
    if (!this.validatePassword(password)) {
      console.log('Invalid password');
      return;
    }

    console.log(email,password);
    fetch("http://localhost:4000/login",{
      method : "post",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept : "applicatoiin/json",
        "Accsess-Control-allow-origin": "*",

      },
      body:JSON.stringify({
        email,
        password,
      }),
    }).then((res)=>res.json())
    .then((data)=>{
      console.log(data,"userRegister");
      if(data.status=='ok'){
        alert("login successfully");
        window.localStorage.setItem("token",data.data);
        
        window.location.href = "./map";
      }
    }); 
  }


  validateEmail(email) {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password) {
    // Password validation rules (e.g., minimum length)
    return password.length >= 6;
  }

  

  
  render() {

    return (
      <form  onSubmit={this.handleSubmit} className='loginForm'>
        <h3>Sign In</h3>

        <div className="mb-3">
          {/* <label>Email address</label> */}
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e)=>this.setState({email: e.target.value})}

          />
        </div>

        <div className="mb-3">
          {/* <label>Password</label> */}
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e)=>this.setState({password: e.target.value})}

          />
        </div>


        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Don't have account? <a id='signup' href="login/register">Signup</a>
        </p>
      </form>
    )
  }
}