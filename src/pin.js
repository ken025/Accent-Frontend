class Pin{
    constructor(id, category, img_url, description, label, link_to_product){
      this.id = id,
      this.category = category,
      this.img_url = img_url,
      this.description = description,
      this.label = label,
      this.link_to_product = link_to_product
    }
  }

  function renderToys(pin) {
    let h2 = document.createElement('h2')
    h2.innerText = pin.category
  
    let img = document.createElement('img')
    img.setAttribute('src', pin.img_url)
    img.className = 'pin_img';
  

  }

// read - fetch pin index

  function fetchPins(){
      fetch('http://localhost:3000/pins')
      .then(resp => resp.json())
      .then(pins => {

          for(const pin of pins){
              let p = new Pin(pin.id, pin.category, pin.img_url, pin.description, pin.label, pin.link_to_product)
              // p = renders each pin separately (encapsulate in cards)
              console.log(p)
          }
      })
  }