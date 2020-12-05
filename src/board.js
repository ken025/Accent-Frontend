class Board{
    constructor(id, user_id){
        this.id = id,
        this.user_id = user_id
    }

    renderBoards() {
        const container = document.getElementById('board-container')

        let board_card = document.createElement('div')
        board_card.setAttribute("id", "board-card")
        container.appendChild(board_card)
    
        let h1 = document.createElement('h1')
        h1.innerText = "Board: "
        board_card.appendChild(h1)

        let board_pin_card = document.createElement('div')
        board_pin_card.setAttribute("id", "board-pin-card")
        board_card.appendChild(board_pin_card)
    }
}

function fetchBoard(){
    fetch('http://localhost:3000/boards')
    .then(resp => resp.json())
    .then(boards => {
        for(const board of boards){
            let b = new Board(board.id, board.category, board.img_url, board.description, board.label, board.link_to_product)
            b.renderBoards();
        }
    })
}

