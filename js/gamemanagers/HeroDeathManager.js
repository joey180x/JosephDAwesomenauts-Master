game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		//always updating
	},

	update: function(){
		if(game.data.player.dead){
			me.game.world.removeChild(game.data.player);
			//if player is dead remove him
			me.state.current().resetPlayer(10, 0);
			//reset the player to set coordinates
		}
		return true;
		//returning true
	}
});