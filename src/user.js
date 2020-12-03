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
  