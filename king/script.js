//model
class Model {
	constructor() {}
	
	start(view) {
		this.view = view;
	}
	
	isRun(direction) {
		this.direction = direction;
		this.view.update();
	}
}

//view
class View {
	constructor() {}
	
	start(model, field) {
		this.model = model;
		this.field = field;
	}
	
	update() {
		switch(this.model.direction) {
			case 0:
				this.field.querySelector('.king').className = 'king';
				break;
			case 1: 
				this.field.querySelector('.king').className += ' run';
				break;
			case -1: 
				this.field.querySelector('.king').className += ' left run';
				break;
		}
	}
}

//controller
class Controller {
	constructor() {}
	
	start(model) {
		this.model = model;
		var self = this;
		
		document.addEventListener('keydown', function(e) {
			switch (e.keyCode) {
				case 39:
					self.model.isRun(1);
					break;
				case 37:
					self.model.isRun(-1);
					break;
				default:
					break;
			}
		});
		
		document.addEventListener('keyup', function() {
			self.model.isRun(0);
		});
	}
}

var field = document.getElementById('main');
var model = new Model();
var view = new View();
var controller = new Controller();
model.start(view);
view.start(model, field);
controller.start(model);