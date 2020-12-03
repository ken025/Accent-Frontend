class Pin{
    constructor(id, category, img_url, description, label, link_to_product){
      this.id = id,
      this.category = category.toUpperCase(),
      this.img_url = img_url,
      this.description = description,
      this.label = label,
      this.link_to_product = link_to_product
    }

    renderPins() {
    const container = document.getElementById('pin-collection')
    let h1 = document.createElement('h1')
    h1.innerText = this.category
    container.appendChild(h1)

    let img = document.createElement('img')
    img.src = this.img_url
    img.className = 'pin_img'
    container.appendChild(img)

    let h4 = document.createElement('h4')
    h4.innerText = this.label
    container.appendChild(h4)

    let h6 = document.createElement('h6')
    h6.innerText = this.description
    container.appendChild(h6)

    let p = document.createElement('p')
    p.innerText = this.link_to_product
    container.appendChild(p)
  }
}
// read - fetch pin index

  function fetchPins(){
      fetch('http://localhost:3000/pins')
      .then(resp => resp.json())
      .then(pins => {

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
    // if(a === "Fashion"){
      if (document.getElementById("input").value === "Fashion"){
     document.getElementById("message").innerHTML = `<form>
      Image URL: <input type="url" id="img_url">
      Description: <input type="text" id="description">
      Brand(s):  <input type="text" id="label">
      URL to Source: <input type="url" id="link_to_product">
      </form>`

    // }else if(a === "Food"){
      }else if (document.getElementById("input").value === "Food"){
        document.getElementById("message").innerHTML = `<form>
      Image URL: <input type="url" id="img_url">
      Description: <input type="text" id="description">
      Cuisine:  <input type="text" id="label">
      URL to Source: <input type="url" id="link_to_product">
      </form>`
    // }else if(a === "Interior Decor"){
    }else if (document.getElementById("input").value === "Interior Decor"){
      document.getElementById("message").innerHTML = `<form>
      Image URL: <input type="url" id="img_url">
      Description: <input type="text" id="description">
      Aesthetic:  <input type="text" id="label">
      URL to Source: <input type="url" id="link_to_product">
      </form>`
    }
  }

  

