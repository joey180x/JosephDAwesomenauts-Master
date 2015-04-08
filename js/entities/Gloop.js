game.Gloop = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "gloop",
			width: 100,
			height: 85,
			spritewidth: "100",
			spriteheight: "85",
			getShape: function(){
				return (new me.Rect(0, 0, 85, 100)).toPolygon();
			}
	}]);
		this.health = game.data.playerHealth;
		this.alwaysUpdate = true;
		//always updating
		this.attacking = false;
		//not attacking
		this.lastAttacking = new Date().getTime();
		//date and time
		this.lastHit = new Date().getTime();
		//last hit time
		this.now = new Date().getTime();
		//the date and time now
		this.body.setVelocity(3, 20);
		//setting velocity

		this.type ="gloop";
		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		//walking animation
		this.renderable.setCurrentAnimation("walk");
		//walking animation	
	},

	loseHealth: function(damage){
		this.health = this.health - damage;
		//loose health
	},

	update:function(delta){ 
		if (this.health <= 0) {
			//if health is 0 or less
			me.game.world.removeChild(this);ild
			//remove ch
		}
		this.now = new Date().getTime();
		//this.now date and time
		this.body.vel.x += this.body.accel.x * me.timer.tick;
		//timer
		this.flipX(true);
		//flip character
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//checking for collisions
		this.body.update(delta);
		//update
		this._super(me.Entity, "update", [delta]);
		//super
		return true;
		//return true
	},
	collideHandler: function(response){andler
		//collide h
	    var ydif = this.pos.y - response.b.pos.y;
		var xdif = this.pos.x - response.b.pos.x;

		if(response.b.type==='EnemyBase') {
			this.attacking=true;
			//attacking
			this.body.vel.x = 0;
			//if it dosent move
			this.pos.x = this.pos.x - 1;
			if((this.now-this.lastHit >= 1000)) {
				//if health is greater then 1000
				this.lastHit = this.now;
				//hitting now
				response.b.loseHealth(game.data.enemyCreepAttack);
				//loose health
			}
		}else if (response.b.type==='EnemyCreep'){
		 var xdif = this.pos.x - response.b.pos.x;
		 var ydif = this.pos.y - response.b.pos.y;

			this.attacking=true;
			//attacking true
			this.body.vel.x = 0;
			//not moving
			if (xdif>0){
				this.pos.x = this.pos.x + 1;
				this.body.vel.x = 0;
			}
			if((this.now-this.lastHit >= 1000) && xdif>0) {
			//if now the last hit was greater than 1k and th xdif is greater than zer0
			this.lastHit = this.now;
			//when was the last hit
			response.b.loseHealth(game.data.enemyCreepAttack);
			//loose health
			}
		}
	}


});