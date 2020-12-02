// in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () =>{
    console.log("DOM HAS LOADED!!!");

const loginForm = document.querySelector("#login-form")
loginForm.addEventListener("submit", (e) => loginFormHandler(e))
})

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
      alert(`Welcome back ${json.user.name}`)
    })
  }
