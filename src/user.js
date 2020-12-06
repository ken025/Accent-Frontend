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
       let container = document.getElementById('user-info')

       let card = document.createElement('div')
        card.setAttribute("id", `user-id-${u.id}`)
        container.appendChild(card)

      let h1 = document.createElement('h1')
        h1.innerText = `Welcome back, ${u.username}!`
        card.appendChild(h1)


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
    <section id="showcase">
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item carousel-image-1 active">
          <div class="container">
          <div class="carousel-caption d-sm-block text-right mb-2" style="background-color:rgba(216, 216, 216, 0.527)">
              <h1 class="display-3 dark-overlay">Fashion</h1>
              <p class="lead dark-overlay">Latest <strong>Fashion</strong> Trends</p>
            </div>
          </div>
        </div>

        <div class="carousel-item carousel-image-2">
          <div class="container">
            <div class="carousel-caption d-none d-sm-block mb-5" style="background-color:rgba(216, 216, 216, 0.527)">
              <h1 class="display-3">Cuisines</h1>
              <p class="lead">Explore <strong>Cuisines</strong> Around the World</p>
            </div>
          </div>
        </div>
        <div class="carousel-item carousel-image-3">
          <div class="container">
            <div class="carousel-caption d-sm-block text-right mb-2" style="background-color:rgba(216, 216, 216, 0.527)">
              <h1 class="display-3">Interior Decor</h1>
              <p class="lead"> Get Inspired To <strong>Decor</strong> Your Space </p>
              <a href="#" class="btn btn-success btn-lg">Learn More</a>
            </div>
          </div>
        </div>
      </div>
      <a href="#myCarousel" data-slide="prev" class="carousel-control-prev">
        <span class="carousel-control-prev-icon"></span>
      </a>
      <a href="#myCarousel" data-slide="next" class="carousel-control-next">
        <span class="carousel-control-next-icon"></span>
      </a>
    </div>
  </section>

          <div class="col-lg-5 mx-auto">
            <div class="card bg-primary text-center card-form">
              <div class="card-body">
                <h3>Sign Up Today</h3>
                <p>Please fill out this form to register</p>
                <form id="login-form">
                   <div class="form-group">
                     <input type="email" class="form-control" id="login-email" aria-describedby="emailHelp" placeholder="Email">
                     <small id="emailHelp" class="form-text text-muted"></p>
                   </div>
                
                   <div class="form-group">
                     <input type="password" class="form-control" id="login-password" placeholder="Password">
                  </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
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


  // <header id="carousel-item" style="margin-top: 85px">
  // <div class="dark-overlay">
  //   <div class="home-inner container">
  //     <div class="row">
  //       <div class="col-lg-8 d-none d-lg-block">
  //         <h1 class="display-4">
  //           <strong>Own</strong> your 
  //           <strong>style</strong>
  //         </h1>
  //         <div class="d-flex">
  //           <div class="p-5 align-self-start">
  //           </div>
  //           <div class="p-2 align-self-end">
           
  //           </div>
  //         </div>

  //         <div class="d-flex">
  //           <div class="p-5 align-self-start">
  //           </div>
  //           <div class="p-2 align-self-end">
       
  //           </div>
  //         </div>

  //         <div class="d-flex">
  //           <div class="p-5 align-self-start">
  //           </div>
  //           <div class="p-2 align-self-end">
           
  //           </div>
  //         </div>
  //       </div>