game.SpendGold = Object.extend({
		init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastBuy = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
		this.updateWhenPaused = true;
		this.buying = false;
		},

	update: function(){
		this.now = new Date().getTime();

		if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
			this.lastBuy = this.now;
			if(!this.buying){
				this.startBuying();
				//if not buying start buying

				}else{
					this.stopBuying();
					//Stop buying
				}
			}

			this.checkBuyKeys();

		return true;
		//returning true
		},

		startBuying: function(){
			this.buying = true;
			//you are now buying
			me.state.pause(me.state.PLAY);
			//changing paused state to play
			game.data.pausePos = me.game.viewport.localToWorld(0, 0);
			game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
			//changing to buy screen
			game.data.buyscreen.updateWhenPaused = true;
			//updating buy screen when paused
			game.data.buyscreen.setOpacity(0.8);
			//opacity of the buy screen
			me.game.world.addChild(game.data.buyscreen, 34);
			game.data.player.body.setVelocity(0, 0);
			//player stays still
			me.state.pause(me.state.PLAY);
			me.input.bindKey(me.input.KEY.F1, "F1", true);
			me.input.bindKey(me.input.KEY.F2, "F2", true);
			me.input.bindKey(me.input.KEY.F3, "F3", true);
			me.input.bindKey(me.input.KEY.F4, "F4", true);
			me.input.bindKey(me.input.KEY.F5, "F5", true);
			me.input.bindKey(me.input.KEY.F6, "F6", true);
			this.setBuyText();
		},

		setBuyText: function(){
				game.data.buytext = new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, game.data.pausePos.y, 10, 300, 50]);
				//coordinates for buy screen on pause position
				this.font = new me.Font("Arial", 26, "white");
				//changing font style
				this.updateWhenPaused = true;
				//update when paused
				this.alwaysUpdate = true;
				//update alwa
				
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Press F1-F4 TO BUY. B TO EXIT. Current Gold: " + game.data.gold, this.pos.x, this.pos.y);

				this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.skill + "Cost: " + ((game.data.skill1+1)*10), this.pos.x, this.pos.y + 40);

				this.font.draw(renderer.getContext(), "Skill 2: Run Faster! Current Level: " + game.data.skill2 + "Cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y + 80);

				this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Curent Level: " + game.data.skill3 + "Cost: " + ((game.data.skill3+1)*10), this.pos.x, this.pos.y + 120);

				this.font.draw(renderer.getContext(), "Q Ablility: Speed Burst. Current Level: " + game.data.ability1 + "Cost: " + ((game.data.ability1+1)*10), this.pos.x, this.pos.y + 160);

				this.font.draw(renderer.getContext(), "W Ablility: Eat Your Creep For Health: " + game.data.ability2 + "Cost: " + ((game.data.ability2+1)*10), this.pos.x, this.pos.y + 200);

				this.font.draw(renderer.getContext(), "E Ablility: Throw Your Spear: " + game.data.ability3 + "Cost: " + ((game.data.ability3+1)*10), this.pos.x, this.pos.y + 240);
				
				}


		}));
		me.game.world.addChild(game.data.buytext, 35);

		},

		
		stopBuying: function(){

			this.buying = false;
			//stoping buyinh

			me.state.resume(me.state.PLAY);
			//change state of game from paused to play

			game.data.player.body.setVelocity(game.data.playerMoveSpeed,  20);

			me.game.world.removeChild(game.data.buyscreen);
			me.input.unbindKey(me.input.KEY.F1, "F1", true);
			//unbinding F1 key after the upgrade menu

			me.input.unbindKey(me.input.KEY.F2, "F2", true);
			//unbinding F2 key after the upgrade menu

			me.input.unbindKey(me.input.KEY.F3, "F3", true);
			//unbinding F3 key after the upgrade menu

			me.input.unbindKey(me.input.KEY.F4, "F4", true);
			//unbinding F4 key after the upgrade menu

			me.input.unbindKey(me.input.KEY.F5, "F5", true);
			//unbinding F5 key after the upgrade menu

			me.input.unbindKey(me.input.KEY.F6, "F6", true);
			//unbinding F6 key after the upgrade menu

			me.game.world.removeChild(game.data.buytext);
			//remove the text on the screen
		},
		

		checkBuyKeys: function() {
			if(me.input.isKeyPressed("F1")){
				//checking if the F1 key is pressed
				if(this.checkCost(1)){
					//if you have enough to make the purchase you can make it
					this.makePurchase(1);
				}
			}else if(me.input.isKeyPressed("F2")){
				//checking if the F2 key is pressed
				if(this.checkCost(2)){
					//if you have enough to make the purchase you can make it
					this.makePurchase(2);
				}
			}else if(me.input.isKeyPressed("F3")){
				//checking if the F3 key is pressed
				if(this.checkCost(3)){
					//if you have enough to make the purchase you can make it
					this.makePurchase(3);
				}
			}else if(me.input.isKeyPressed("F4")){
				//checking if the F4 key is pressed
				if(this.checkCost(4)){
					//if you have enough to make the purchase you can make it
					this.makePurchase(4);
				}
			}else if(me.input.isKeyPressed("F5")){
				//checking if the F5 key is pressed
				if(this.checkCost(5)){
					//if you have enough to make the purchase you can make it
					this.makePurchase(5);
				}
			}else if(me.input.isKeyPressed("F6")){
				//checking if the F6 key is pressed
				if(this.checkCost(6)){
					//if you have enough to make the purchase you can make it
					this.makePurchase(6);
				}
			}
		},

		
		checkCost: function(skill){
			if(skill===1 && (game.data.gold >=((game.data.skill1+1)*10))){
				//if skill 1 and gold is greater than or equal to skill1

				return true;
			
			}else if(skill===2 && (game.data.gold >=((game.data.skill2+1)*10))){
				//if skill 1 and gold is greater than or equal to skill2

				return true;
			
			
			}else if(skill===3 && (game.data.gold >=((game.data.skill3+1)*10))){
				//if skill 1 and gold is greater than or equal to skill3

				return true;
			
			}else if(skill===4 && (game.data.gold >=((game.data.ability1+1)*10))){
				//if skill 1 and gold is greater than or equal to skill4

				return true;
			
			}else if(skill===5 && (game.data.gold >=((game.data.ability2+1)*10))){
				//if skill 1 and gold is greater than or equal to skill5

				return true;
			
			}else if(skill===6 && (game.data.gold >=((game.data.ability3+1)*10))){
				//if skill 1 and gold is greater than or equal to skill6

				return true;
			
			}else{

				return false;
			}
		},

		makePurchase: function(skill){
			if(skill === 1){
			game.data.gold -= ((game.data.skill1 +1) * 10);
			game.data.skill1 += 1;
			game.data.playerAttack += 1;

		}else if(skill ===2){
			game.data.gold -= ((game.data.skill2 +1) * 10);
			game.data.skill2 += 1;

		}else if(skill ===3){
			game.data.gold -= ((game.data.skill3 +1) * 10);
			game.data.skill3 += 1;

		}else if(skill ===4){
			game.data.gold -= ((game.data.ability1 +1) * 10);
			game.data.ability1 += 1;

		}else if(skill ===5){game.data.gold -= ((game.data.ability2 +1) * 10);
			game.data.ability2 += 1;

		}else if(skill ===6){
			game.data.gold -= ((game.data.ability3 +1) * 10);
			game.data.ability3 += 1;
		
		}
	}

});
