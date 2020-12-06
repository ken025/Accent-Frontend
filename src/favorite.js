class Favorite{
    constructor(id, user_id, pin_id){
        this.id = id,
        this.user_id = user_id,
        this.pin_id = pin_id
    }

    renderFavorites(pin) {
        const pin_id = this.id
        const container = document.getElementById('fav-collection')
        
        let favorite_pin_card = document.createElement('div')
            favorite_pin_card.setAttribute("id", "fav-pin-collection")
            container.appendChild(favorite_pin_card)

        let h1 = document.createElement('h1')
            h1.innerText = "Board: "
            favorite_pin_card.appendChild(h1)

        let img = document.createElement('img')
            img.src = pin.img_url
            favorite_pin_card.appendChild(img)

        let h4 = document.createElement('h4')
            h4.innerText = pin.label
            favorite_pin_card.appendChild(h4)

        let h6 = document.createElement('h6')
            h6.innerText = pin.description
            favorite_pin_card.appendChild(h6)

        let p = document.createElement('p')
            p.innerText = pin.link_to_product
            favorite_pin_card.appendChild(p)

        const dlt = document.createElement("button")
            dlt.innerText = "Remove ★"
            dlt.dataset.action = "delete"
            favorite_pin_card.appendChild(dlt)
            favorite_pin_card.addEventListener("click", function(e) {
                if (e.target.dataset.action === "delete") {
                // needs to actually do something 
                e.target.parentElement.remove();

                const configObj = {
                    method: "DELETE", 
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(favorite_pin_card)
                }
                fetch(`http://localhost:3000/favorites/${pin_id}`, configObj)
                    .then(resp => resp.json())
                    .then(json => {
                        console.log(json)
              })
            }
          })
    }   
}

function fetchFavorites(){
    fetch('http://localhost:3000/favorites')
    .then(resp => resp.json())
    .then(favorites => {
        console.log(favorites)
        for(const favorite of favorites){
            let fav = new Favorite(favorite.id, favorite.user_id, favorite.pin_id)
            console.log(fav)
            fav.renderFavorites(favorite.pin);
        }
    })
}

function createFavorite(pin){
    let user_id = 1;
    let favorite = {
      user_id: user_id,
      pin_id: pin.id,
    }
      const configObj = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(favorite)
    }
    fetch(`http://localhost:3000/favorites`, configObj)
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
            //  debugger
            let c = new Favorite(json.id, json.user_id, json.pin_id)
             c.renderFavorites(pin)
        })
  }
