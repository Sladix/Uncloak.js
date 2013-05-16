var Uncloack = {
	defaultOptions : {color: "#FFF",rows:3,type:"ltr"},
	animOptions: {type:"simple",duree:3000},
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
		this.faceSize = Math.ceil(this.element.outerHeight() / this.hElNum);
		this.wElNum = Math.ceil(this.element.outerWidth() / this.faceSize);
		//Création des carrés
		var c = 0

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
				el.css('backgroundColor',this.options.color);
				el.attr("id","uncloack-face-"+c);
				el.addClass("uncloack-face");
				c++;
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
		var duree = 0;
		$(".uncloack-face").each(function (i,e) {
			duree = (r*Math.ceil(options.duree/wElNum));
			setTimeout(function () {
				var pos = $(e).position();
				var tleft = (pos.left-faceSize);
				var w = faceSize*2;
				var c = "#FF";
				var letters = ["A","B","C","D","E","F"];
				for (var i =  0; i < 4; i++) {

					c+=	Math.floor((Math.random()*9)+1)+'';
				};
				
				/*$(e).css('background',c);*/
				$(e).animate({left:tleft+"px",width:w+"px",backgroundColor:c},{duration:700});
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