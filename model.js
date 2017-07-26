var ConnectFourGame = function(width=7, height=6, connect=4) {
    this.width = width;
    this.height = height;
    this.connect = connect;

    this.gameBoard = new Array(this.width);
    for (var i=0; i<=this.width; i++) {
        this.gameBoard[i] = [];
    }
    this.turn = "black";

    this.switchTurn = function() {
        this.turn = (this.turn == "black") ? "red" : "black";
    }

    this.get = function(col, row) {
        if (col < this.width && row < this.gameBoard[col].length) {
            return this.gameBoard[col][row];
        }
        return null;
    }

    // returns the row that the checker lands in
    this.put = function(col) {
        this.gameBoard[col].push(this.turn);
        // this.printBoard();
        return this.gameBoard[col].length - 1
    }

    // returns true if the game is over
    this.isGameOver = function() {
        for (var x=0; x<this.width-(this.connect-1); x++) {
            for (var y=0; y<(this.connect-1); y++) {
                var h_win = true;
                for (var i=0; i<this.connect; i++) {
                    if (this.get(x,y+i) != this.turn) {
                        h_win = false;
                        break;
                    }
                }
                var v_win = true;
                for (var i=0; i<this.connect; i++) {
                    if (this.get(x+i,y) != this.turn) {
                        v_win = false;
                        break;
                    }
                }
                var d_win = true;
                for (var i=0; i<this.connect; i++) {
                    if (this.get(x+i,y+i) != this.turn) {
                        d_win = false;
                    }
                }
                var rd_win = true;
                for (var i=0; i<this.connect; i++) {
                    if (this.get(x+i,this.height-1-y-i) != this.turn) {
                        rd_win = false;
                    }
                }
                if (h_win || v_win || d_win || rd_win) {
                    return true;
                }
            }
        }
        return false;
    }

    this.printBoard = function() {
        var s = ''
        for (var r = this.height - 1; r >= 0; r--) {
            for (var c = 0; c < this.width; c++) {
                var spot = ' ';
                switch(this.get(c,r)) {
                    case "black":
                        spot = 'b';
                        break;
                    case "red":
                        spot = 'r';
                }
                s = s + '|' + spot;
            }
            s += '|\n';
        }
        console.log(s);
    }
}