// METODO DE CLASE MEJORANDOLA: creamos un array BIDMENSIONAL
var	matrixGame = [],
		levelHard, userHits,
		resetTrick,
		levelHits, MAXBOMBS; // la dimension de la matriz seleccionada menos las bombas

var createMatrix = function (event){
	var	selectHardness = document.getElementsByName('hardness')[0],
			selectedMatrix = selectHardness.options[selectHardness.selectedIndex].value;
	
	// dejaremos de ejecutar la matriz si cargamos <select> por primera vez (la opcion es nula)
	if( !selectedMatrix ) return false;

	// resetear el tiempo de trampa
	window.clearTimeout(resetTrick);

	//mostrar botones de juego
	document.getElementById('trick').style.display = 'inline';
	document.getElementById('reset').style.display = 'inline';

	//vaciar matriz actual y resetear el nivel de dificultad
	var wrapperMatrix = document.getElementById('matrixMine');
	wrapperMatrix.innerHTML = "";
	userHits = 0;
	levelHard = selectHardness.options[selectHardness.selectedIndex].dataset.level;
	document.getElementsByClassName('hits')[0].innerText = "";
	matrixGame = [];

	//crear el html de la matriz
	var nuevaMatriz = createHtmlMatrix(selectedMatrix, levelHard);

	document.getElementsByClassName('level')[0].innerText = "Cuidado, hay "+MAXBOMBS+" minas";
	levelHits = (selectedMatrix * selectedMatrix) - MAXBOMBS;

	//añadir el html de la matriz
	wrapperMatrix.innerHTML = nuevaMatriz;

	// asignar el evento de click sobre el boton
	var btnMatrix = document.getElementsByClassName('btnMatrix');
	for (var i = 0, len = btnMatrix.length; i < len; i++) {
		//datos del juego por cada interaccion del usuario
		btnMatrix[i].addEventListener('click', evaluateGame, false);
	}
};

var evaluateGame = function (evClcik){
	var	posX = this.dataset.posx,
			posY = this.dataset.posy,
			apuesta = matrixGame[posY][posX];

	// console.log('valor matriz: '+matrixGame[posY][posX]); //deberia ser igual a la apuesta
	console.log(matrixGame);
	console.log('apuesta: '+apuesta, 'posX: '+posX, 'posY: '+posY);

	// mostrar visualmente el resultado de la eleccion
	this.style.backgroundImage = "url('img/"+this.dataset.img+".png')";

	//bloqueamos el resultado que hemos seleccionado para no volverlo a repetir
	this.disabled = true;

	// reseteamos la matriz en el caso de que pierda o gane
	if( apuesta == 1){
		window.alert('Nooooooooooooo\n¡¡¡ OTRA VEZ !!!');
		createMatrix();
	}else{
		//mostarr al usuario la cantidad de aciertos restante
		userHits++;
		document.getElementsByClassName('hits')[0].innerText = "Te faltan "+(levelHits - userHits)+" aciertos";
		if( userHits === levelHits){
			window.alert('¡¡¡ GANASTE !!!\ntramposo ¬¬');
			createMatrix();
		}
	}
};

var createHtmlMatrix = function (matrixLevel, levelHard){
	var	htmlMatrix = "",
			maxLevelHard = 0,
			imgBtn = '';
	MAXBOMBS = 0; //contador de bombas realeles del juego

	matrixGame = new Array(matrixLevel);

	for (var i = 0; i < matrixLevel ; i++) {
		htmlMatrix += '<div class="rowMatrix">';
		matrixGame[i] = new Array(matrixLevel);
		var maxBombsByRow = 0;

		for (var j = 0; j < matrixLevel ; j++) {
			// creamos un valor aleatorio del 0 al 1
			var randomVal = Math.round(getRandomArbitrary(0, 1));

			// creo el boton de interaccion con el usuario y contabilizo la dificultad maxima
			if( randomVal == 1 && maxLevelHard < levelHard ){
				maxBombsByRow++;

				if( maxBombsByRow <= 2 ){
					maxLevelHard++;
					imgBtn = 'bomb';
					matrixGame[i][j] = 1; //BOMBA
					MAXBOMBS++;
				}else{
					imgBtn = 'allow';
					matrixGame[i][j] = 0;
				}
			} else if ( maxBombsByRow > 2 && maxLevelHard < levelHard){
				imgBtn = 'bomb';
				matrixGame[i][j] = 1; //BOMBA
				MAXBOMBS++;
			}else{
				imgBtn = 'allow';
				matrixGame[i][j] = 0;
			}

			htmlMatrix +=	'<input type="button" class="btnMatrix" value="" ' +
								'data-posx="'+j+'" data-posy="'+i+'" data-img="'+imgBtn+'"/>';
		}
		htmlMatrix += '</div>';
	}
		console.log('numeroo de bombas: '+MAXBOMBS);

	return htmlMatrix;
};

var solucionMomentanea = function (evClick){
	/* mostrar visualmente el resultado de la eleccion
	- mientras estan visibles impedir la interaccion.
	- solo mostrar aquellos que no tiene backgroundImage */

	var btnMatrix = document.getElementsByClassName('btnMatrix');
	for (var i = 0, len = btnMatrix.length; i < len; i++) {
		btnMatrix[i].disabled = true;

		//añadir un puntero de visualizados a aquello que se han mostrado
		if( btnMatrix[i].style.backgroundImage === "" ){
			btnMatrix[i].dataset.trampa = 'mostrar';
			btnMatrix[i].style.backgroundImage = "url('img/"+btnMatrix[i].dataset.img+".png')";
		}
	}

	resetTrick = window.setTimeout(function(){
		for (var i = 0, len = btnMatrix.length; i < len; i++) {
			btnMatrix[i].disabled = false;

			//eliminar el puntero de aquellos que se han visulazados
			if( btnMatrix[i].dataset.trampa === "mostrar"){
				btnMatrix[i].dataset.trampa = '';
				btnMatrix[i].style.backgroundImage = "";
			}

		}
	}, 500);
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
var getRandomArbitrary = function (min, max) {
  return Math.random() * (max - min) + min;
};

(function (w){
	var selectHardness = document.getElementsByName('hardness')[0];
	selectHardness.addEventListener('change', createMatrix, false);

	var resetMatrix = document.getElementsByName('resetGame')[0];
	resetMatrix.addEventListener('click', createMatrix, false);

	var trick = document.getElementById('trick');
	trick.addEventListener('click', solucionMomentanea, false);
}(window));
