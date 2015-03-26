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
	   