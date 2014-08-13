// METODO DE CLASE MEJORANDOLA: creamos un array BIDMENSIONAL
var matrixGame = [];

var createMatrix = function (event){
	var	selectHardness = document.getElementsByName('hardness')[0],
			selectedMatrix = selectHardness.options[selectHardness.selectedIndex].value;
	
	// dejaremos de ejecutar la matriz si cargamos <select> por primera vez (la opcion es nula)
	if( !selectedMatrix ) return false;

	var wrapperMatrix = document.getElementById('matrixMine');
	//vaciar matriz actual
	wrapperMatrix.innerHTML = "";

	//resetear nuestro array de juego
	matrixGame = [];

	//crear el html de la matriz
	var nuevaMatriz = htmlMatrix(selectedMatrix);

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

	console.log('valor matriz: '+matrixGame[posY][posX]); //deberia ser igual a la apuesta
	console.log('apuesta: '+apuesta, 'posX: '+posX, 'posY: '+posY);

	// mostrar visualmente el resultado de la eleccion
	this.style.backgroundImage = "url('img/"+this.dataset.img+".png')";
	this.style.backgroundColor =  'white';
	this.style.border =  'none';

	if( apuesta === 1){
		window.alert('Nooooooooooooo\n¡¡¡ OTRA VEZ !!!');
		// reseteamos la matriz
		createMatrix();
	}
}

var htmlMatrix = function (matrixLevel){
	var htmlMatrix = "";

	matrixGame = new Array(matrixLevel);

	for (var i = 0; i < matrixLevel ; i++) {
		htmlMatrix += '<div class="rowMatrix">';
		matrixGame[i] = new Array(matrixLevel);

		for (var j = 0; j < matrixLevel ; j++) {
			// creamos un valor aleatorio del 0 al 1
			var randomVal = Math.round(getRandomArbitrary(0, 1));

			// lo asigno a la matriz bidimensional del juego (matrixGame)
			matrixGame[i][j] = randomVal;

			// creo el boton de interaccion con el usuario
			var imgBtn = ( randomVal === 1 ) ? 'bomb' : 'allow' ;
			htmlMatrix +=	'<input type="button" class="btnMatrix" value="" ' +
								'data-posx="'+j+'" data-posy="'+i+'" data-img="'+imgBtn+'"/>';
		}
		htmlMatrix += '</div>';
	}

	return htmlMatrix;
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
}(window));
