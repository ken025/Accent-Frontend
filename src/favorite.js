class Favorite{
    constructor(id, user_id, pin_id){
        this.id = id,
        this.user_id = user_id,
        this.pin_id = pin_id
    }

    renderFavorites(pin) {
        const container = document.getElementById('fav-collection')

    let favorite_card = document.createElement('div')
        favorite_card.setAttribute("class", "fav-collection")
        container.appendChild(favorite_card)
    
        
      let img = document.createElement('img')
      img.src = pin.img_url
      favorite_card.appendChild(img)

      let h4 = document.createElement('h4')
      h4.innerText = pin.label
      favorite_card.appendChild(h4)

      let h6 = document.createElement('h6')
      h6.innerText = pin.description
      favorite_card.appendChild(h6)

      let p = document.createElement('p')
      p.innerText = pin.link_to_product
      favorite_card.appendChild(p)
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