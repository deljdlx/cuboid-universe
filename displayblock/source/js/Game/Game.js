
class Game extends Viewport
{
    constructor(width, height, container)
    {

        super(width, height, container);
        this.players =  {};
    }



    addPlayer(player, cell) {
      this.players[player.getId()] = player;
      this.board.addItem(player, cell);
    }


}