game.GameTimerManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
	},

	update: function(){
		this.now = new Date().getTime();
		this.goldTimerCheck();
		this.creepTimerCheck();
	
		return true;
	},

	goldTimerCheck: function(){
			if (Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >=1000)){
			game.data.gold += 1;
			//console.log("Current gold: " + game.data.gold);
		
		}
		},

	creepTimerCheck: function(){
			if (Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >=1000)){
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creepe, 5);
			//putting creep in game
		
		}
	}
});

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


game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		//always updating
		this.gameover = false;
		//game over is false

	},

	update: function(){
		if(game.data.win === true && !this.gameover) {
			this.gameOver(true);
		}else if(game.data.win === false && !this.gameover){
			//if the game isnt over and you loose game is over
			this.gameOver(false);

		}

		return true;
		//returning true
	},

	gameOver: function(win){
		if (win){
			game.data.exp += 10;
			//if game dosnet end you get 10
		}else{
			game.data.exp += 1;
			//if game isnt over you gain 1 health
		}
			game.data.gameover = true;
			//game is over
			me.save.exp = game.data.exp;
			//saving game experience
			me.save.exp2 = 4;
		}
});