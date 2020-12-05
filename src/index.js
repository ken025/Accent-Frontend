// in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () =>{
    console.log("DOM HAS LOADED!!!");

const loginForm = document.querySelector("#login-form")
loginForm.addEventListener("submit", (e) => loginFormHandler(e))

renderUserSignupForm()
loginUserForm()
fetchPins();
pinSelectForm()
fetchBoard()
fetchBoardPins()
})

