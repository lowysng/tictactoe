const TicTacToe = function(N) {
    this.N = N
    this.board = []
    for (let i = 0; i < this.N; i++) {
        const row = []
        for (let i = 0; i < this.N; i++) {
            row.push(' ')
        }
        this.board.push(row)
    }
    this.rows = { 'player1': Array(this.N).fill(0), 'player2': Array(this.N).fill(0) }
    this.cols = { 'player1': Array(this.N).fill(0), 'player2': Array(this.N).fill(0) }
    this.mainDiag = { 'player1': 0, 'player2': 0 }
    this.offDiag = { 'player1': 0, 'player2': 0 }
}

TicTacToe.prototype.availableMoves = function() {
    const availableMoves = []
    for (let i = 0; i < this.N; i++) {
        for (let j = 0; j < this.N; j++) {
            if (this.board[i][j] === ' ') {
                availableMoves.push({ row: i, col: j })
            }
        }
    }
    return availableMoves
}

TicTacToe.prototype.isValidMove = function(row ,col) {
    if (this.board[row][col] !== ' ') {
        return false
    }
    return true
}

TicTacToe.prototype.play = function(row, col, player) {
    this.board[row][col] = player
    this.rows[`player${player}`][row] += 1
    this.cols[`player${player}`][col] += 1
    if (row === col) {
        this.mainDiag[`player${player}`] += 1
    }
    if (row === (this.N - 1 - col)) {
        this.offDiag[`player${player}`] += 1
    }
}

TicTacToe.prototype.evaluate = function() {
    if (this.isTerminal()) {
        if (
            this.rows.player1.some(val => val === this.N) ||
            this.cols.player1.some(val => val === this.N) ||
            this.mainDiag.player1 === this.N ||
            this.offDiag.player1 === this.N
        ) {
            return 1
        } else if (
            this.rows.player2.some(val => val === this.N) ||
            this.cols.player2.some(val => val === this.N) ||
            this.mainDiag.player2 === this.N ||
            this.offDiag.player2 === this.N
        ) {
            return -1
        } else {
            return 0
        }
    } else {
        return null
    }
}

TicTacToe.prototype.isTerminal = function() {
    return (
        this.rows.player1.some(val => val === this.N) ||
        this.cols.player1.some(val => val === this.N) ||
        this.mainDiag.player1 === this.N ||
        this.offDiag.player1 === this.N ||
        this.rows.player2.some(val => val === this.N) ||
        this.cols.player2.some(val => val === this.N) ||
        this.mainDiag.player2 === this.N ||
        this.offDiag.player2 === this.N ||
        this.availableMoves().length === 0
    )   
}

TicTacToe.prototype.toString = function() {
    let str = ''
    for (let i = 0; i < this.N; i++) {
        str += this.board[i].join(' | ')
        if (i !== this.N - 1) {
            str += '\n'
        }
    }
    return str
}

TicTacToe.prototype.getBoardState = function() {
    return JSON.parse(JSON.stringify(this))
}

TicTacToe.prototype.setBoardState = function(state) {
    this.N = state.N
    this.board = state.board
    this.rows = state.rows
    this.cols = state.cols
    this.mainDiag = state.mainDiag
    this.offDiag = state.offDiag
}

const cache = new Map()

TicTacToe.prototype.minimax = function(player) {
    if (cache.has(`${player}->${this.toString()}`)) {
        return cache.get(`${player}->${this.toString()}`)
    }

    if (this.isTerminal()) {
        const score = this.evaluate()
        return { score }
    }

    const moves = this.availableMoves()
    for (let i = 0; i < moves.length; i++) {
        const state = this.getBoardState()

        const { row, col } = moves[i]
        this.play(row, col, player)
        const { score } = this.minimax(player === 1 ? 2 : 1)
        moves[i].score = score

        this.setBoardState(state)
    }

    let bestEval = moves[0].score
    let bestMove = moves[0]
    for (let i = 1; i < moves.length; i++) {
        const { score } = moves[i]
        if (player === 1) {
            if (score > bestEval) {
                bestEval = score
                bestMove = moves[i]
            }
        } else {
            if (score < bestEval) {
                bestEval = score
                bestMove = moves[i]
            }
        }
    }

    const out = { move: { row: bestMove.row, col: bestMove.col }, score: bestEval }
    cache.set(`${player}->${this.toString()}`, out)
    return out
}

const tictactoe = new TicTacToe(3)

export const getNextBestMove = (tmpBoard) => {
    let rows = { 'player1': Array(3).fill(0), 'player2': Array(3).fill(0) }
    let cols = { 'player1': Array(3).fill(0), 'player2': Array(3).fill(0) }
    let mainDiag = { 'player1': 0, 'player2': 0 }
    let offDiag= { 'player1': 0, 'player2': 0 }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tmpBoard[i][j] !== ' ') {
                const id = tmpBoard[i][j]
                rows[`player${id}`][i] += 1
                cols[`player${id}`][j] += 1
                if (i === j) mainDiag[`player${id}`] += 1
                if (i === 2 - j) offDiag[`player${id}`] += 1
            }
        }
    }
    const copy = []
    for (let i = 0; i < 3; i++) {
        copy.push([...tmpBoard[i]])
    }
    tictactoe.setBoardState({
        N: 3,
        board: copy,
        rows,
        cols,
        mainDiag,
        offDiag,
    })
    const { move: { row, col } } = tictactoe.minimax(2)
    return { row, col }
}
