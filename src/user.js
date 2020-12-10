class User{
  constructor(id, name, username, email){
    this.id = id,
    this.name = name,
    this.username = username,
    this.email = email
  }
}
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
       let container = document.getElementById('user-info')

       let card = document.createElement('div')
        card.setAttribute("id", `user-id-${u.id}`)
        container.appendChild(card)

      let h1 = document.createElement('h1')
        h1.setAttribute("style", "text-shadow: 2px 2px #00000044")
        h1.innerText = `Welcome back, ${u.username}!`
        card.appendChild(h1)

        const login_form = document.getElementById("login-form")
          login_form.remove()
        
          explore();
          fetchPins();
          pinSelectForm()
          fetchFavorites()
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
        let u = new User(user.id, user.name, user.username, user.email, user.password)
        u.renderUserSignupForm();
      })
    })
  }

  function loginUserForm(){
    let userLogInForm = document.getElementById("login-form")

    userLogInForm.innerHTML +=
    `
          <div class="col-lg-5 mx-auto" style="margin-top: 10px; margin-bottom: 50px">
                <h3 style="color:rgb(61, 61, 61); text-align:center">Sign Up Today</h3><br />
                <form id="login-form">
                   <div class="form-group">
                     <input type="email" class="form-control" id="login-email" aria-describedby="emailHelp" placeholder="Email">
                     <small id="emailHelp" class="form-text text-muted"></p>
                   </div>
                
                   <div class="form-group">
                     <input type="password" class="form-control" id="login-password" placeholder="Password">
                  </div>
                  <button type="submit" class="btn btn-outline-dark btn-block">Submit</button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
`
  }