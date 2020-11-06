/*
vamos a crear una funcion con el uso de JS6 que se encargue
del cifrado y descifrado del texto de area cosiderando
utilizar fucniones anonimas y callback
*/

var cesar = cesar || (function(){
	/*
	tenemos que entender que para poder cifrar o descifrar
	es necesario obtener 3 parametros, txt, desp y action
	*/
	var doStaff = function(txt, desp, action){
		
		var replace = (function(){
			//necesito un alfabeto
			var abc = ['a','b','c','d','e','f','g','h','i','j','k',
					'l','m','n','ñ','o','p','q','r','s','t','u',
					'v','w','x','y','z'];
			var l = abc.length;

			//funcion para cambiar las posiciones
			return function(c){
				var i = abc.indexOf(c.toLowerCase());
				//reemplazo de posiciones
				//el texto esta vacio?
				if(i !== -1){
					var pos = i;

					if(action){
						//cifrar
						if(pos+desp>=l){
							pos += desp-27;
						}else{
							pos += desp;
						}
					}else{
						//descifrar
						if(pos-desp<0){
							pos -= desp-27;
						}else{
							pos -= desp;
						}
					}
					
					return abc[pos];

				}
				return c;
			};
		})();

		var re = (/[a-zñ]/ig);
		return String(txt).replace(re,function(match){
			return replace(match);
		});

	};

	return {
		encode : function(txt,desp){
			return doStaff(txt, desp, true);
		},
		decode : function(txt,desp){
			return doStaff(txt, desp, false);
		}
	};

})();


//crear las funciones codificar y decodificar
function codificar(){
	if(!isNaN(document.getElementById("desp").value)){
		document.getElementById("resultado").innerHTML = "Cifrado: "+
		cesar.encode(document.getElementById("cadena").value, Math.abs(Math.round(document.getElementById("desp").value%27)));
	}
}

function decodificar(){
	if(!isNaN(document.getElementById("desp").value)){
		document.getElementById("resultado").innerHTML = "Mensaje: "+
		cesar.decode(document.getElementById("cadena").value, Math.abs(Math.round(document.getElementById("desp").value%27)));
	}
}


