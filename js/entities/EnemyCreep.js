game.EnemyCreep = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "creep1",
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight: "64",
			getShape: function(){
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
			}
		}]);
		this.health = 10;
		this.alwaysUpdate = true;
		//this attacking lets us know if the ememy is currently attacking
		this.attacking = false;
		//this.attacking lets us know if the enemy is currently attacking

		this.lastAttacking = new Date().getTime();
		//keeps track when our creep last attacked
		this.lastHit = new Date().getTime();
		//keeps track of last time the creep hit anything
		this.now = new Date().getTime();
		//timer for attacking player base
		this.body.setVelocity(3, 20);

		this.type = "EnemyCreep";

		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		this.renderable.setCurrentAnimation("walk");
		},

	loseHealth: function(damage){

		this.health = this.health - damage;
	},

	update: function(delta){
		//console.log(this.health);
		if(this.health <= 0){
			me.game.world.removeChild(this);
		}

		this.now = new Date().getTime();
		//refresh every single time

		this.body.vel.x -= this.body.accel.x * me.timer.tick;

		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//checking for collisions

		this.body.update(delta);

			this._super(me.Entity, "update", [delta]);
			//updating the super function "delta"


		return true;
	},

	collideHandler: function(response) {
		if(response.b.type ==='PlayerBase'){
		//whatever creep isrunning in to
			this.attacking = true;
			//attacking is true
			this.lastAttacking=this.now;
			//timer of when last attack
			this.body.vel.x = 0;
			//making velocity 0
			//keeps movning the creep to the right to maintain its position
			this.pos.x = this.pos.x + 1;
			//evertime I hit the base i want to stop 
			//movement by sliding a little to the right

			if((this.now-this.lastHit >= 1000)){
				//checks that is has ben at least 1 second since the creep hit a base
				//if its been more than a second since attack i will
				//attack again
				this.lastHit = this.now;
				//updates he last hit timer
				//reset it to now is current timer
				response.b.loseHealth(game.data.enemyCreepAttack);
				//makes the player base call its losehealth function
				//and passes it a damage of 1

			}
		}else if (response.b.type === 'PlayerEntity'){
			var xdif = this.pos.x - response.b.pos.x;

			this.attacking=true;
			//attacking is true
			//this.lastAttacking=this.now;
			//timer of when last attack
			
			if(xdif>0){
				this.pos.x = this.pos.x + 1;
				//evertime I hit the base i want to stop 
			//movement by sliding a little to the right
				this.body.vel.x = 0;
			//making velocity 0
			//keeps movning the creep to the right to maintain its position
			}

			if((this.now-this.lastHit >= 1000) && xdif>0){
				//checks that is has ben at least 1 second since the creep hit something
				//if its been more than a second since attack i will
				//attack again
				this.lastHit = this.now;
				//updates he last hit timer
				//reset it to now is current timer
				response.b.loseHealth(game.data.enemyCreepAttack);
				//makes the player call its losehealth function
				//and passes it a damage of 1

			}
		}
	}
});
