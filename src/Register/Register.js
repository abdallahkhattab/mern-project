

//import { json } from 'body-parser';

import React, { Component } from 'react'
import { isEmail, isEmpty } from 'validator';

import { withRouter } from 'react-router-dom';

export default class Register extends Component {

  constructor(props){
    super(props)
    this.state = {
      fname :"",
      lname :"",
      email : "",
      password :"",
      errors: {}

    };

    

   this.handleSubmit = this.handleSubmit.bind(this);
  }
   //*



   
    handleSubmit(e){
      e.preventDefault();
      if (this.validateForm()) {
      const{fname,lname,email,password} = this.state;
      console.log(fname,lname,email,password);
      fetch("http://localhost:4000/login/register",{
        method : "post",
        crossDomain:true,
        headers:{
          "Content-Type":"application/json",
          Accept : "applicatoiin/json",
          "Accsess-Control-allow-origin": "*",

        },
        body:JSON.stringify({
          fname,lname,email,password,
        }),
      }).then((res)=>res.json())
      .then((data)=>{
        console.log(data,"userRegister");
        alert("Signup Successfully");
        
        window.location.href = "/map";
      });

      
      
    }}

    validateForm() {
      const { fname, lname, email, password } = this.state;
      const errors = {};
    
      if (isEmpty(fname)) {
        errors.fname = 'First name is required';
      }
    
      if (isEmpty(lname)) {
        errors.lname = 'Last name is required';
      }
    
      if (isEmpty(email)) {
        errors.email = 'Email is required';
      } else if (!isEmail(email)) {
        errors.email = 'Invalid email address';
      }
    
      if (isEmpty(password)) {
        errors.password = 'Password is required';
      }

      if (password<6) {
        errors.password = 'Password is too short';
      }
    
      this.setState({ errors });
      return Object.keys(errors).length === 0;
    }
    
    submituserRegistrationForm(e) {
      e.preventDefault();
      if (this.validateForm()) {
          let fields = {};
          fields["fname"] = "";
          fields["lname"] = "";
          fields["email"] = "";
          fields["password"] = "";
          this.setState({fields:fields});
          alert("Form submitted");
              // Redirect to the map route

      }

    }




  render() {
    return (
      <form  className='FormRegister' onSubmit={this.handleSubmit
        
      }>
        <h3>Sign Up</h3>

        <div className="mb-3">
          {/* <label className="col-sm-2 col-form-label">First name</label> */}
          
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e)=>this.setState({fname: e.target.value})}
          />
          {this.state.errors.fname && (
    <div className="error" style={{ color: 'red' }}>{this.state.errors.fname}</div>
  )}
        </div>

        <div className="mb-3">
          {/* <label>Last name</label> */}
          <input type="text" className="form-control" placeholder="Last name" 
                      onChange={(e)=>this.setState({lname: e.target.value})}

          />
          {this.state.errors.lname && (
    <div className="error" style={{ color: 'red' }}>{this.state.errors.lname}</div>
  )}

        </div>

        <div className="mb-3">
          {/* <label>Email address</label> */}
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e)=>this.setState({email: e.target.value})}

          />

{this.state.errors.email && (
    <div className="error" style={{ color: 'red' }}>{this.state.errors.email}</div>
  )}
        </div>

        <div className="mb-3">
          {/* <label>Password</label> */}
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e)=>this.setState({password: e.target.value})}

          />
          {this.state.errors.password && (
    <div className="error" style={{ color: 'red' }}>{this.state.errors.password}</div>
  )}
        </div>

        <div className="d-grid">
         
         <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/login">sign in?</a>
        </p>
      </form>
    )
  }
}