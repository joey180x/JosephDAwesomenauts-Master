game.EnemyBaseEntity = me.Entity.extend({
				//comments are in code above because theyre exactly the same
			init : function(x, y, settings){
				this._super(me.Entity, 'init', [x, y, {
					image: "tower",
					width: 100,
					height: 100,
					spritewidth: "100",
					spriteheight: "100",
					getShape: function(){
						return (new me.Rect(0, 0, 100, 70)).toPolygon();
					}
				}]);
				this.broken = false;
				this.health = 10;
				this.alwaysUpdate = true;
				this.body.onCollision = this.onCollision.bind(this);

				this.type = "EnemyBaseEntity";

				this.renderable.addAnimation("idle", [0]);
				//at the 0 idle posotion
				this.renderable.addAnimation("broken", [1]);
				//at the 1 position
				this.renderable.setCurrentAnimation("idle");
				//idle position
			
			},

			update:function(delta){
				if(this.health<=0){
					this.broken = true;
					game.data.win = true;
					this.renderable.setCurrentAnimation("broken");
					//renderable is in melonjs to be able to add animations so they will render
				}
				this.body.update(delta);

				this._super(me.Entity, "update", [delta]);
				return true;
			},

			onCollision: function(){

			},

			loseHealth: function(){
				this.health--;	
			}

		});