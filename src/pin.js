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
      card.className = "card"
      card.setAttribute("style", "width: 25rem; background-color:rgba(189, 225, 243, 0.5); margin-top: 50px; text-align: center; ")

      card.setAttribute("id", `pin-id-${this.id}`)
      container.appendChild(card)

      let h1 = document.createElement('h1')
      h1.innerText = this.category
      h1.className = "card-title"
      card.appendChild(h1)

      let img = document.createElement('img')
      img.src = this.img_url
      img.className = "pinImg card-img-top"
      card.appendChild(img)

      let h4 = document.createElement('h4')
      h4.innerText = this.label
      h4.className = "pinH4 card-text"
      card.appendChild(h4)

      let h6 = document.createElement('h6')
      h6.innerText = this.description
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
        btn.innerText = "☆"
        btn.className = "btn btn-outline-light btn-block"
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
    <section id="explore-head-section">
    <div class="containe">
      <div class="row mx-auto" style="margin-top: 50px">
        <div class="col text-center py-5" style="background-color:rgba(255, 255, 255, 0.493)">
          <h1 class="display-4" style="color:rgb(124, 182, 211)">Explore The Possibilities</h1>
        </div>
      </div>
    </div>
  </section>
  `
  }

  // function pinSelectForm(){
    //     let pinsForm = document.getElementById("pins-form")
    
    //     pinsForm.innerHTML = 
    // `
    //   <select id="input" name="filter" onchange="renderPinForm()">
    //     <option>Fashion</option>
    //     <option>Food</option>
    //     <option>Interior Decor</option>
    //   </select><br />
    
    //   <div id="message"></div>
    // `
    
    // renderPinForm();
    // }
    
    
    //   function renderPinForm(){
    //     let a = document.getElementById("input").value;
    //     // console.log(a)
    //     let formContainer = document.getElementById("message")
      
    //     let my_form=document.createElement('FORM');
    //     let my_form.name='myForm';
    //     let my_form.method='POST';
    //     let my_form.action='http://localhost:3000/pins';
         
    
    //     if (a === "Fashion"){
    
    //     } else if(a === "Food"){
    
    //     } else if( a === "Interior Decor"){
    
    //     }
    // my_form.submit();
    
            
    
    
    
    // my_tb=document.createElement('INPUT');
    // my_tb.type='url';
    // my_tb.id='myInput';
    // my_tb.value='Values of my Input';
    // my_form.appendChild(my_tb);
    
    // my_form.appendChild(my_tb);
    
    // my_form.submit();
    //      formContainer.innerHTML = `
    //       Image URL: <input type="url" id="img_url">
    //       Description: <input type="text" id="description">
    //       Brand(s):  <input type="text" id="label">
    //       URL to Source: <input type="url" id="link_to_product">
    //       <input type="submit" value="Post Pin">
    //       </form>
    