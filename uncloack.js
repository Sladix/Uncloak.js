var Uncloack = {
	defaultOptions : {color: "#FFF",rows:3,type:"ltr",randomColor:false,seed:"none"},
	animOptions: {type:"simple",duree:2000},
	init: function(element,options){
		//On fusionne les options avec celles par défaut
		this.options = $.extend(this.defaultOptions,options);
		this.element = $(element);
		this.wrapper = $(document.createElement('div'));
		this.wrapper.attr('id','uncloack-wrapper');
		this.wrapper.css('position','relative');
		//On ajoute le wrapper
		this.element.wrap(this.wrapper);

		this.container = $(document.createElement('div'));
		this.container.css('position','absolute');
		this.container.css('top','0px');
		this.container.css('left','0px');
		this.container.css('height','100%');
		this.container.css('width','100%');
		//Puis le conteneur
		$('#uncloack-wrapper').append(this.container);
		//Temporaire, nombre de carrés verticalement
		this.hElNum = this.options.rows;
		this.faceSize = Math.floor(this.element.outerHeight() / this.hElNum);
		//if(this.faceSize%this.hElNum != 0)
			//this.faceSize = Math.ceil(this.element.outerHeight() / (this.hElNum+1));
		this.wElNum = Math.ceil(this.element.outerWidth() / this.faceSize);
		//Création des carrés
		var id = 0
		var letters = ["A","B","C","D","E","F"];
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

					if(this.options.seed != "none")
					{

						coolor = this.options.seed;
						y=4;
					}
					else
					{
						y = 4;
						coolor = '#';
					}
					//TODO générer la seed si pas en param
					var x = 0;
					while(x<y){
						//TODO, limit range
						var l = Math.round(Math.random()*1);
						if (l==1)
						{
							l =  Math.floor((Math.random()*5)+1);
							coolor+= letters[l];
						}
						else
						{
							coolor+= Math.floor((Math.random()*9)+1)+'';
						}
						x++;
					}
					coolor+="EA";
				}
				el.css('background-color',coolor.toString());
				el.attr("id","uncloack-face-"+id);
				el.addClass("uncloack-face");
				id++;
				this.container.append(el);
			}
		}
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
		$(".uncloack-face").each(function (i,e) {
			duree = (r*Math.ceil(options.duree/wElNum));
			setTimeout(function () {
				var pos = $(e).position();
				var tleft = (pos.left-faceSize);
				var w = faceSize*2;
				/*$(e).css('background',c);*/

				$(e).animate({left:tleft+"px",width:w+"px",opacity:0},{duration:700});
			},duree);
			c++;
			if (c>hElNum) {c = 0;r++}
		});
		/*for (var i = 0; i < this.wElNum; i+this.hElNum) {
			setTimeout(function () {
				$("#uncloack-face-"+i).animate({left:"-42px",opacity:0},{duration:1000});
				//$("#uncloack-face-"+i).nextAll().slice(0,(this.hElNum-1)).animate({left:"-42px",opacity:0},{duration:1000});
			},(i*20));
		};*/
	}
}