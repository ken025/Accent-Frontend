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
            favorite_pin_card.className = "card; col-lg-5 mx-auto"
            favorite_pin_card.setAttribute("id", "fav-pin-collection")
            favorite_pin_card.setAttribute("style", "width: 10rem; background-color:#fff ; margin-top: 50px; text-align: center; border-radius: 27px; box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 10px 20px 0 rgba(0, 0, 0, 0.19); ")
            container.appendChild(favorite_pin_card)

        let img = document.createElement('img')
            img.src = pin.img_url
            img.setAttribute("style", "color:rgb(61, 61, 61); border: 2px solid grey; margin-top: 15px;")
            img.className = "card-img d-flex align-content-around flex-wrap"
            favorite_pin_card.appendChild(img)

        let h1 = document.createElement('h1')
            h1.innerText = pin.category
            h1.setAttribute("style", "color:rgb(61, 61, 61)")
            h1.className = "card-title"
            favorite_pin_card.appendChild(h1)

        let h4 = document.createElement('h4')
            h4.innerText = pin.label
            h4.setAttribute("style", "color:rgb(61, 61, 61)")
            h4.className = "card-text"
            favorite_pin_card.appendChild(h4)

        let h6 = document.createElement('h6')
            h6.innerText = pin.description
            h6.setAttribute("style", "color:rgb(61, 61, 61)")
            h6.className = "card-text"
            favorite_pin_card.appendChild(h6)

        let a = document.createElement('a')
            a.innerText = "Link to Website"
            a.href = pin.link_to_product 
            a.className = "card-link"
            a.setAttribute = ("style", "color:rgb(61, 61, 61)")
            favorite_pin_card.appendChild(a)

        const dlt = document.createElement("button")
            dlt.setAttribute("style", "margin-bottom: 8px;")
            dlt.innerText = "Remove ★"
            dlt.className = "btn btn-outline-dark btn-block"
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
    
    static fetchFavorites(){
        fetch('http://localhost:3000/favorites')
        .then(resp => resp.json())
        .then(favorites => {
            for(const favorite of favorites){
                let fav = new Favorite(favorite.id, favorite.user_id, favorite.pin_id)
                fav.renderFavorites(favorite.pin);
            }
        })
    }

    static createFavorite(pin){
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
}