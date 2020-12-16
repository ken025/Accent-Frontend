// in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () =>{
    console.log("DOM HAS LOADED!!!");

loginUserForm()
})

function explore(){
    let explore = document.getElementById("explore")

    explore.innerHTML += 
    `
    <section id="home-header" class="p-5">
    <div class="dark-overlay">
        <div class="row">
            <div class="col">
            <div class="container pt-5">
                <h1 class="d-none d-md-block" style="font-family: 'Monoton', cursive; font-size: 400%">Explore - The - Possibilities</h1>
            </div>
            </div>
        </div>
        </div>
    </section>
  `
  }
