var Uncloack = {
	defaultOptions : {color: "#FFF",rows:3,type:"classic",randomColor:false,seed:"none"},
	animOptions: {type:"simple",duree:2000},
	init: function(element,options){
		//On fusionne les options avec celles par défaut
		this.options = $.extend(this.defaultOptions,options);
		this.element = $(element);
		//Temporaire, nombre de carrés verticalement
		this.hElNum = this.options.rows;
		this.faceSize = Math.ceil(this.element.outerHeight() / this.hElNum);
		//On regarde si notre conteneur est là, sinon ou l'ajoute, ainsi que le style des transitions.
		if(!this.element.parent().hasClass('uncloack-wrapper'))
		{
			this.wrapp();
			if(typeof $('#uncloack-transitions').attr('type') == "undefined")
			{
				$('body').append('<style id="uncloack-transitions" type="text/css">.uncloack-rotate-scale{-webkit-transform:rotate(180deg) scale(0.2);}.uncloack-scale{-webkit-transform:scale(0.2);}.uncloack-rotate{-webkit-transform:rotate(90deg);)}</style>');
			}
		}

		this.container = $(document.createElement('div'));
		this.container.attr('class','uncloack-container');
		this.container.css('position','absolute');
		this.container.css('cursor','pointer');
		this.container.css('top','0px');
		this.container.css('left','0px');
		this.container.css('height','100%');
		this.container.css('width','100%');
		//Puis le conteneur
		this.element.parent().append(this.container);
		
		//if(this.faceSize%this.hElNum != 0)
			//this.faceSize = Math.ceil(this.element.outerHeight() / (this.hElNum+1));
		this.wElNum = Math.ceil(this.element.outerWidth() / this.faceSize);
		//Création des carrés
		var id = 0;
		if(this.options.seed = "none" && this.options.randomColor == true)
		{
			this.options.seed = '#';
			
			var letters = ["A","B","C","D","E","F"];
			for (var i = 0; i < 3; i++) {
				var l = Math.round(Math.random());
				if (l==1) {
					this.options.seed+= letters[l]+letters[l];
				}else
				{
					this.options.seed+= this.rand(0,9)+''+this.rand(0,9)+'';
				}
			};
		}
		
		for(var i = 0;i <= this.wElNum;i++)
		{
			for (var j = 0; j < this.hElNum; j++) {
				el = $(document.createElement('div'));
				el.css('position','absolute');
				el.height(this.faceSize);
				//On gère le dernier carré pour qu'il fit sa race !
				if(j == (this.wElNum-1))
				{
					el.width(this.element.outerWidth() - (j*this.faceSize));
				}else
				{
					el.width(this.faceSize);
				}

				el.css('top',(j*this.faceSize)+"px");
				el.css('left',(i*this.faceSize)+"px");
				var coolor = this.options.color;
				if (this.options.randomColor) {
					coolor = this.generateColor(this.options.seed);
				}
				el.css('background-color',coolor.toString());
				el.attr("id","uncloack-face-"+id);
				el.addClass("uncloack-face");
				id++;
				this.container.append(el);
			}
		}
	},
	wrapp : function(){
		var m = this.element.css("margin");
		this.element.css('margin','0');
		this.wrapper = $(document.createElement('div'));
		this.wrapper.attr('class','uncloack-wrapper');
		this.wrapper.css('position','relative');
		this.wrapper.css('margin',m);
		//On ajoute le wrapper
		this.element.wrap(this.wrapper);
	},
	generateColor:function(seed)
	{

	
		var base = this.hexToHsl(seed);


		var h = base[0]*360;
    	var s = base[1]*100/*+this.rand(-20, 20)*/;
    	var l = base[2]*100+this.rand(-10, 10);
	    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
	},
	reveal: function(uanimOptions){
		this.animOptions = $.extend(this.animOptions,uanimOptions);


		var c = 0;
		var r = 0;
		var faceSize = this.faceSize;
		var hElNum = this.hElNum;
		var wElNum = this.wElNum;
		var options = this.animOptions;	
		options.color = this.defaultOptions.color;
		var duree = 0;
		var animations = ["classic","simple","rotation","scale","rotatescale"];
		var animRand = this.rand(0,animations.length-1);
		
		
		if(options.type == "random")
		{
			options.type = animations[animRand];
		}
		$(".uncloack-face").each(function (i,e) {
			var pos = $(e).position();
			duree = (r*Math.round(options.duree/wElNum));
			var addition = "undefined";
			switch(options.type)
			{
				case "simple":
				var aduree = 400;
				var aoptions = {left:(0-faceSize)+"px",
							width:faceSize+"px",
							opacity:1
						   };
				break;
				case "upndown":

				break;
				case "rotation":
				var aduree = {duration:400};
				$(e).css('-webkit-transition','all '+((options.duree/2)/1000).toFixed(2)+'s ease');
				var aoptions = {opacity:0};
				addition = 'uncloack-rotate';
				break;
				case "scale":
				var aduree = {duration:400};
				$(e).css('-webkit-transition','all '+((options.duree/2)/1000).toFixed(2)+'s ease');
				var aoptions = {opacity:0};
				addition = 'uncloack-scale';
				break;
				case "rotatescale":
				var aduree = {duration:400};
				$(e).css('-webkit-transition','all '+((options.duree/2)/1000).toFixed(2)+'s ease');
				var aoptions = {opacity:0};
				addition = 'uncloack-rotate-scale';
				break;
				default:
				case "classic":
				var aduree = 1000;
				var aoptions = {left:(pos.left+faceSize)+"px",
							width:(faceSize*2)+"px",
							opacity:0
						   };
				break;
			}
			//On lance l'animation
			setTimeout(function () {
				if(addition != "undefined")
					$(e).addClass(addition);
				$(e).animate(aoptions,aduree,function(){$(this).remove()});
			},duree);
			c++;
			if (c>hElNum) {c = 0;r++}
		});
		var element = this.element;
		var add;
		(options.duree > 3000 && aduree > 500)?add = 0:add=600;
		setTimeout(function () {
			$(element).next().remove();
		},options.duree+(wElNum*hElNum)+add);
		/*for (var i = 0; i < this.wElNum; i+this.hElNum) {
			setTimeout(function () {
				$("#uncloack-face-"+i).animate({left:"-42px",opacity:0},{duration:1000});
				//$("#uncloack-face-"+i).nextAll().slice(0,(this.hElNum-1)).animate({left:"-42px",opacity:0},{duration:1000});
			},(i*20));
		};*/
	},
	rand: function (min, max) {
	    return parseInt(Math.random() * (max-min+1), 10) + min;
	},
	hexToHsl: function (hex){
		var r = parseInt(hex.substr(1,2), 16); // Grab the hex representation of red (chars 1-2) and convert to decimal (base 10).
		var g = parseInt(hex.substr(3,2), 16);
		var b = parseInt(hex.substr(5,2), 16);
	    r /= 255, g /= 255, b /= 255;
	    var max = Math.max(r, g, b), min = Math.min(r, g, b);
	    var h, s, l = (max + min) / 2;

	    if(max == min){
	        h = s = 0; // achromatic
	    }else{
	        var d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        switch(max){
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        h /= 6;
	    }

	    return [h, s, l];
	}
}