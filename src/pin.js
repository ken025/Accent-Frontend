class Pin{
    constructor(id, category, img_url, description, label, link_to_product){
      this.id = id,
      this.category = category,
      this.img_url = img_url,
      this.description = description,
      this.label = label,
      this.link_to_product = link_to_product
    }

    renderPins() {
    const container = document.getElementById('pin-collection')

      let card = document.createElement('div')
      card.className = "col-lg-5 mx-auto" 
      card.setAttribute("style", "width: 10rem; background-color:#fff ; margin-top: 50px; text-align: center; border-radius: 27px; box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 10px 20px 0 rgba(0, 0, 0, 0.19); ")
      card.setAttribute("id", `pin-id-${this.id}`)
      container.appendChild(card)

      let img = document.createElement('img')
      img.src = this.img_url
      img.setAttribute("style", "color:rgb(61, 61, 61); border: 2px solid grey; margin-top: 15px;")
      img.className = "pinImg card-img d-flex align-content-around flex-wrap"
      card.appendChild(img)

      let h1 = document.createElement('h1')
      h1.innerText = this.category
      h1.setAttribute("style", "color:rgb(61, 61, 61)")
      h1.className = "card-title"
      card.appendChild(h1)

      let h4 = document.createElement('h4')
      h4.innerText = this.label
      h4.setAttribute("style", "color:rgb(61, 61, 61)")
      h4.className = "pinH4 card-text"
      card.appendChild(h4)

      let h6 = document.createElement('h6')
      h6.innerText = this.description
      h6.setAttribute("style", "color:rgb(61, 61, 61)")
      h6.className = "pinH6 card-text"
      card.appendChild(h6)

      let a = document.createElement('a')
      a.innerText = "Link to Website"
      a.href = this.link_to_product 
      a.setAttribute = ("target", "_blank")
      a.className = "card-link"
      card.appendChild(a)

    let btn = document.createElement('button')
        btn.setAttribute('class', 'pin-btn')
        btn.setAttribute('id', this.id)
        btn.setAttribute("style", "margin-bottom: 8px;")
        btn.innerText = "☆"
        btn.className = "btn btn-outline-dark btn-block"
        btn.addEventListener('click', (e) => {
          e.preventDefault()

          createFavorite(this)
          // console.log(e.target);
        })
        card.appendChild(btn)
  }
}
// read - fetch pin index

  function fetchPins(){
      fetch('http://localhost:3000/pins')
      .then(resp => resp.json())
      .then(pins => {
          // debugger
          for(const pin of pins){
              let p = new Pin(pin.id, pin.category, pin.img_url, pin.description, pin.label, pin.link_to_product)
              // p = renders each pin separately (encapsulate in cards)
              // console.log(p)
             p.renderPins();
          }
      })
  }

function pinSelectForm(){
  let pinsForm = document.getElementById("pins-form")

  pinsForm.innerHTML += 
`
<select id="input" name="filter" onchange="renderPinForm()">
  <option>Fashion</option>
  <option>Food</option>
  <option>Interior Decor</option>
</select><br />
<div id="message"></div>
`

renderPinForm();
}


function renderPinForm(){
  let a = document.getElementById("input").value;
  // console.log(a)
  if (a === "Fashion"){
  document.getElementById("message").innerHTML = `<form> 
      Image URL: <input type="url" id="img_url">
      Description: <input type="text" id="description">
      Brand(s):  <input type="text" id="label">
      URL to Source: <input type="url" id="link_to_product">
      <input type="submit" value="Post Pin">
    </form>`

  }else if (a === "Food"){
    document.getElementById("message").innerHTML = `<form>      
        Image URL: <input type="url" id="img_url">
        Description: <input type="text" id="description">
        Cuisine:  <input type="text" id="label">
        URL to Source: <input type="url" id="link_to_product">
        <input type="submit" value="Post Pin">
    </form>`

  }else if (a === "Interior Decor"){
    document.getElementById("message").innerHTML = `<form>          
        Image URL: <input type="url" id="img_url">
        Description: <input type="text" id="description">
        Aesthetic:  <input type="text" id="label">
        URL to Source: <input type="url" id="link_to_product">
        <input type="submit" value="Post Pin">
    </form>`
  }

  formSubmission();
}

  function formSubmission(){
    let pinsForm = document.getElementById("pins-form")
    pinsForm.addEventListener("submit", (e)=>{
      e.preventDefault()

      let category = document.getElementById("input").value;
      let img_url = document.getElementById("img_url").value;
      let description = document.getElementById("description").value;
      let label = document.getElementById("label").value;
      let link_to_product = document.getElementById("link_to_product").value;

      //  console.log(category, description, label, pinsForm)

      let pin = {
        category,
        img_url,
        description,
        label,
        link_to_product
      }

      fetch('http://localhost:3000/pins', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pin)
      })
      .then(resp => resp.json())
      .then(pin => {
        let p = new Pin(pin.id, pin.category, pin.img_url, pin.description, pin.label, pin.link_to_product)
        p.renderPins();
      })
    })
  }
  
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
