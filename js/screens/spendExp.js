game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO
		//adding exp screen for upgrades

		me.input.bindKey(me.input.KEY.F1, "F1");
		me.input.bindKey(me.input.KEY.F2, "F2");
		me.input.bindKey(me.input.KEY.F3, "F3");
		me.input.bindKey(me.input.KEY.F4, "F4");
		me.input.bindKey(me.input.KEY.F5, "F5");
		var exp1cost = ((game.data.exp1 + 1) * 10);
		
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				this.font = new me.Font("Arial", 26, "white");
				//changing font style
				
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Press F1-F4 TO BUY. F5 TO SKIP", this.pos.x, this.pos.y);
				//text on screen for upgrade options
				this.font.draw(renderer.getContext(), "CURENT EXP: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
				this.font.draw(renderer.getContext(), "F1: INCREASE GOLD PRODUCTION! CURRENT LEVEL: " + game.data.exp1.toString() + " COST: " + exp1cost, this.pos.x, this.pos.y + 100);
				//telling user what level is
				this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD ", this.pos.x, this.pos.y + 150);
				this.font.draw(renderer.getContext(), "F3: INCREASE ATTACK DAMAGE ", this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "F4: INCREASE STARTING HEALTH ", this.pos.x, this.pos.y + 250);
			}

			
			})));

	this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
		if(action === "F1"){
			if(game.data.exp >= exp1cost){
				//if exp is greater than or equal to 10
				game.data.exp1 += 1;
				//plus 1 exp if player presses F2
				game.data.exp -= exp1cost;
				//takes 10 exp off if buys
				me.state.change(me.state.PLAY);
				//changes state to play
			}else{
				console.log("not enough experience");
			}
		}else if(action === "F2"){

		}else if(action === "F3"){
			
		}else if(action === "F4"){
			
		}else if(action === "F5"){			
			me.state.change(me.state.PLAY);
			//changing state to play
			}	
		});


	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.F1, "F1");
		me.input.unbindKey(me.input.KEY.F2, "F2");
		me.input.unbindKey(me.input.KEY.F3, "F3");
		me.input.unbindKey(me.input.KEY.F4, "F4");
		me.input.unbindKey(me.input.KEY.F5, "F5");
		me.event.unsubscribe(this.handler);
		//once we move on to game keys don't take effect
		
	}
});
