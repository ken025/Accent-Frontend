class BoardPin{
    constructor(id, board_id, pin_id){
        this.id = id,
        this.board_id = board_id,
        this.pin_id = pin_id
    }

    renderBoardPins() {
        const container = document.getElementById('board-pin-container')

        let board_pin_card = document.createElement('div')
        board_pin_card.setAttribute("class", "board-pin-card")
        container.appendChild(board_pin_card)
    
        let img = document.createElement('img')
            let pin_img = document.querySelector(`#pin-id-${this.pin_id} .pinImg`)
                img = pin_img.cloneNode(true)
                board_pin_card.appendChild(img)
    }   
}

function fetchBoardPins(){
    fetch('http://localhost:3000/board_pins')
    .then(resp => resp.json())
    .then(board_pins => {
        console.log(board_pins)
        for(const board_pin of board_pins){
            let bp = new BoardPin(board_pin.id, board_pin.board_id, board_pin.pin_id)
            console.log(bp)
            bp.renderBoardPins();
        }
    })
}
