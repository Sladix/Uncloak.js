Uncloak.js
==========

Jquery plugin to reveal your html elements

Usage
========
<pre><code>
var u = Object.create(Uncloack);
u.init("#test",{
	color:"#eeeee",
	rows:5,
	randomColor:true,
	seed:"#22000"
});
//Provisoir, vous pouvez aussi mettre votre element trigger
$(".uncloack-container").click(function(){u.reveal({duree:500,type:"random"})});
</code></pre>
