var Controller = function(model) {
    this.game = model;

    this.drawEmptyBoard = function() {
        $('#board tbody').empty();
        var s = '';
        for (var r = 0; r < this.game.height; r++) {
            s += '<tr>' + Array(this.game.width+1).join('<td></td>') + '</tr>';
        }
        $('#board tbody').append(s);
    }

    this.drawChecker = function(row, col) {
        $('#board tbody tr:nth-child('+(this.game.height-row)+') td:nth-child('+(col+1)+')').addClass(this.game.turn);
    }

    this.addEventListeners = function() {
        var self = this;

        // when the user clicks on a column, add their checker to the column
        $("#board td").click(function() {
            var col = $(this).parent().children().index($(this));
            // if the column is not full
            if (self.game.get(col,self.game.height-1) == null) {
                var row = self.game.put(col);
                self.drawChecker(row, col);
                if (self.game.isGameOver()) {
                    self.endGame();
                }
                self.game.switchTurn();
                $('#turn').toggleClass("red").text(self.game.turn + ' Turn');
            }
        });

        $('#btnNewGame').click(function() {
            var width = parseInt($('#num-cols').val());
            var height = parseInt($('#num-rows').val());
            self.game = new ConnectFourGame(width,height);
            self.playConnectFour();
        })
    }

    this.endGame = function() {
        console.log("Game over!");
        $('#board').addClass('game-over').css('pointer-events', 'none');
        $('#game-over').show();
        $('#game-over-player').addClass(this.game.turn).text(this.game.turn+' wins!');
    }

    this.playConnectFour = function() {
        $('#turn').removeClass("red").text('Black Turn');
        $('#board').removeClass('game-over').css('pointer-events', 'auto');
        $('#game-over').hide();
        this.drawEmptyBoard();
        this.addEventListeners();
    }
}
