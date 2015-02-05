game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		me.levelDirector.loadLevel("Level01");
		//loading "level01" one game is loaded

		var player = me.pool.pull("player", 0, 420, {});
		//pulling instince of the player
		//pulling player out of the pool

		me.game.world.addChild(player, 5);
		//addChild is adding player to world
		//higher the number the closer player is to the screen

		me.input.bindKey(me.input.KEY.RIGHT, "right");
		//binds the right key for movement
		//click right key to walk right
		me.input.bindKey(me.input.KEY.A, "attack");
		//making player attack by pressing A

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
