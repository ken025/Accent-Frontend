class User{
  constructor(id, name, username, email){
    this.id = id,
    this.name = name,
    this.username = username,
    this.email = email
  }

 
}
// function logged_in_test(){
//   if logged_in?
// }

// in form handler capture the user's input
function loginFormHandler(e) {
    e.preventDefault()
    const emailInput = e.target.querySelector("#login-email").value
    const pwInput = e.target.querySelector("#login-password").value
    loginFetch(emailInput, pwInput)
  }
  
  
  function loginFetch(email, password){
      const bodyData = {user: {
            email,
            password
          }
      }
    
      fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
      })
      .then(response => response.json())
      .then(json => {
        localStorage.setItem('jwt_token', json.jwt)
        renderUserProfile()
      })
    }
  
    function renderUserProfile() {
      console.log(localStorage.getItem('jwt_token'));
      fetch('http://localhost:3000/api/v1/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }
      })
      .then(response => response.json())
      .then(json => {
        let u = new User(json.user.id, json.user.name, json.user.username, json.user.email)
        alert(`Welcome back ${json.user.name}`, u)
      })
    }

  function renderUserSignupForm(){
    let userSUForm = document.getElementById("sign-up-form")

    userSUForm.innerHTML+= 
    `
      <form  id="signup-form">
      <div class="form-group">
      <h5>Name</h5>
      <input type="name" class="form-control" id="signup-name">
    </div>

      <form  id="signup-form">
      <div class="form-group">
      <h5>Username</h5>
      <input type="username" class="form-control" id="signup-username">
    </div>

      <h5>Email</h5>
      <input type="email" class="form-control" id="signup-email" aria-describedby="emailHelp">
      <small id="emailHelp" class="form-text text-muted"></p>
        We'll never share your email with anyone else.</small>
    </div>

    <div class="form-group">
      <h5>Password</h5>
      <input type="password" class="form-control" id="signup-password">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form><br />
`
  }

  function createUser(){
    let userSUForm = document.getElementById("sign-up-form")
    userSUForm.addEventListener("submit", (e) =>{
      e.preventDefault()

      let name = document.getElementById("signup-name").value;
      let username = document.getElementById("signup-username").value;
      let email = document.getElementById("signup-email").value;
      let password = document.getElementById("signup-password").value;

      let user = {
        name,
        username,
        email,
        password
      }

      fetch('http://localhost:3000/api/v1/users', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(resp => resp.json())
      .then(user => {
        let u = new User(json.user.id, json.user.name, json.user.json.username, json.user.email, json.user.password)
        u.renderUserSignupForm();
      })
    })
  }

  function loginUserForm(){
    let userLogInForm = document.getElementById("login-form")

    userLogInForm.innerHTML +=
    `
    <form  id="login-form">
    <div class="form-group">
      <h5>Email</h5>
      <input type="email" class="form-control" id="login-email" aria-describedby="emailHelp">
      <small id="emailHelp" class="form-text text-muted"></p>
        We'll never share your email with anyone else.</small>
    </div>

    <div class="form-group">
      <h5>Password</h5>
      <input type="password" class="form-control" id="login-password">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form><br />
`
  }