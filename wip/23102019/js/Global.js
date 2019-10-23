class Global {
    constructor() {
		this.green  = 0x00ff00;
		this.darkgreen  = 0x008800;
		this.black  = 0x000000;
		this.white  = 0xffffff;
		this.red    = 0xff0000;
		this.yellow = 0xffff00;
		this.blue   = 0x0000ff;

		this.offset = 0.01;

		this.PI =  3.1415926536;
		this.ETA = 1.5707963268;
		this.TAU = 6.28318530718;
		this.TURN = 360;
		this.HTURN = 180;
		this.QTURN = 90;
		this.RADIAN = 57.29579;

		this.variationA = Math.floor(Math.random()*2);
		this.variationB = Math.floor(Math.random()*7);
		this.variationC = Math.floor(Math.random()*7);
		this.variationD = Math.floor(Math.random()*7);
		if(this.variationB+this.variationC==0){this.variationB=1;}
		this.rotationA = Math.floor(Math.random()*3);
		this.rotationB = Math.floor(Math.random()*3);
		this.weightExtreme = 0.2;

		this.weightLeft = this.weightExtreme+(Math.random()*(1-(this.weightExtreme*2)));
		this.weightRight = this.weightExtreme+(Math.random()*(1-(this.weightExtreme*2)));
		this.weightMiddle = 2-(this.weightLeft+this.weightRight);

		this.weightA = this.weightExtreme+(Math.random()*(1-(this.weightExtreme*2)));
		this.weightB = this.weightExtreme+(Math.random()*(1-(this.weightExtreme*2)));
		this.weightC = this.weightExtreme+(Math.random()*(1-(this.weightExtreme*2)));
		this.weightD = this.weightExtreme+(Math.random()*(1-(this.weightExtreme*2)));
		this.weightE = this.weightExtreme+(Math.random()*(1-(this.weightExtreme*2)));
		this.weightF = this.weightExtreme+(Math.random()*(1-(this.weightExtreme*2)));
		this.weightG = this.weightExtreme+(Math.random()*(1-(this.weightExtreme*2)));
		this.weightH = this.weightExtreme+(Math.random()*(1-(this.weightExtreme*2)));
		this.weightI = this.weightExtreme+(Math.random()*(1-(this.weightExtreme*2)));
		this.weightJ = this.weightExtreme+(Math.random()*(1-(this.weightExtreme*2)));
		this.weightK = this.weightExtreme+(Math.random()*(1-(this.weightExtreme*2)));

		console.log(
			  "this.variationA:",this.variationA,
			  "this.variationB:",this.variationB,
			  "this.variationC:",this.variationC,
			  "this.variationD:",this.variationD,
		   "this.weightExtreme:",this.weightExtreme,
			  "this.weightLeft:",this.weightLeft,
			 "this.weightRight:",this.weightRight,
			"this.weightMiddle:",this.weightMiddle,
				 "this.weightA:",this.weightA,
				 "this.weightB:",this.weightB,
				 "this.weightC:",this.weightC,
				 "this.weightD:",this.weightD,
				 "this.weightE:",this.weightE,
				 "this.weightF:",this.weightF,
				 "this.weightG:",this.weightG,
				 "this.weightH:",this.weightH,
				 "this.weightI:",this.weightI,
				 "this.weightJ:",this.weightJ,
				 "this.weightK:",this.weightK
		)
	}
}