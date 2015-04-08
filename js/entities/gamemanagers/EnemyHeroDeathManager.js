/*game.EnemyDeathManager = Object.extend({
	//
	init: function(x, y, settings){
		//always updates function
		this.alwaysUpdate = true;
	},
	update: function(){
		if(game.data.player.dead){
			//if player dies
			me.game.world.removeChild(game.data.player);
			//remove player
			me.game.world.removeChild(game.data.miniPlayer);
			me.state.current().resetPlayer(10, 0);
			//resettin player to set coordinates
		}
		return true;
		//return true
	}
});