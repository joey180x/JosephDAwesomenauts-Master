			game.PlayerBaseEntity = me.Entity.extend({
				init : function(x, y, settings) {
				this._super(me.Entity, 'init', [x, y, {
					image: "tower",
					//tower image
					width: 100,
					height: 100,
					spritewidth: "100",
					//spright width 100
					spriteheight: "100",
					//sprite height 100
					getShape: function(){
						return (new me.Rect(0, 0, 100, 70)).toPolygon();
					}
				}]);
				this.broken = false;
				//variable saying tower is not destroyed
				this.health = game.data.PlayerBaseHealth;
				//10 health
				this.alwaysUpdate = true;
				//even if tower is not showing on screen it still
				//is updating
				this.body.onCollision = this.onCollision.bind(this);
				//if someone runs in to the tower it will be able to collide with it
				this.type = "PlayerBase";

				this.renderable.addAnimation("idle", [0]);
				//at the 0 idle posotion
				this.renderable.addAnimation("broken", [1]);
				//at the 1 position
				this.renderable.setCurrentAnimation("idle");
				//idle position
			},

			update:function(delta){
				if(this.health<=0){
					//if my health is greater then or equal to 0
					this.broken = true;
					//they we are dead
					game.data.win = false;
					this.renderable.setCurrentAnimation("broken");
				}
				this.body.update(delta);
				//making sure delta updates

				this._super(me.Entity, "update", [delta]);
				//calling super class
				return true;
				//returning true
			},

			loseHealth: function(damage){
				this.health = this.health - damage;
				//base lose health when it gets damaged
			},

			onCollision: function(){
				//on collision function empty for now

			}

		});
