function obtenerFechaFormateada(dia, mes, año) {
	// Crea una nueva fecha con los valores de día, mes y año proporcionados
	// Recuerda que los meses en JavaScript son 0-indexed, por lo que debes restar 1 al mes
	let fecha = new Date(año, mes - 1, dia);

	// Obtiene el nombre del día de la semana en español
	let diaSemana = fecha.toLocaleString("es-AR", {
		timeZone: "America/Argentina/Buenos_Aires",
		weekday: "long",
	});

	// Obtiene el nombre del mes en español
	let nombreMes = fecha.toLocaleString("es-AR", {
		timeZone: "America/Argentina/Buenos_Aires",
		month: "long",
	});

	// Devuelve la fecha formateada
	return `${capitalizeFirstLetter(diaSemana) + " " + dia + " de "} ${
		capitalizeFirstLetter(nombreMes) + " del año "
	} ${año}`;
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// FUNCION PARA GENERAR CERTIFICADO

function generar() {
	let sexo = document.getElementById("sexo").value;

	let nombre = capitalizeFirstLetter(document.getElementById("nombre").value);

	let curso = capitalizeFirstLetter(document.getElementById("curso").value);
	let dni = document.getElementById("dni").value;
	let apellido = capitalizeFirstLetter(
		document.getElementById("apellido").value
	);
	let fecha = document.getElementById("fecha").value;
	let horas = document.getElementById("horas").value;
	let modulo = document.getElementById("modulo").value;
	let formato = document.getElementById("formato").value;
	let centro = document.getElementById("centro").value;
	let quien, señor; // Declarar las variables fuera del bloque if

	if (
		sexo === "" ||
		nombre === "" ||
		curso === "" ||
		dni === "" ||
		apellido === "" ||
		fecha === "" ||
		horas === "" ||
		modulo === "" ||
		formato === "" ||
		centro === ""
	) {
		alert(
			"Por favor, completa todos los campos antes de generar el certificado."
		);
	} else {
		if (sexo === "hombre") {
			quien = "el";
			señor = "Sr";
		} else {
			quien = "la";
			señor = "Sra";
		}

		// Divide la fecha en sus componentes
		let fechaComponentes = fecha.split("-");
		let año = fechaComponentes[0];
		let mes = fechaComponentes[1];
		let dia = fechaComponentes[2];

		// Obtiene la fecha formateada
		let fechaFormateada = obtenerFechaFormateada(dia, mes, año);

		//styles

		// Completa las variables en el texto del certificado
		let certificadoText = `Se certifica que ${quien} <span class='text-red'>${señor} ${
			nombre + " " + apellido
		}</span>, DNI: <span class='text-red'>${dni}</span> ha aprobado cada una de las instancias correspondientes al <span class='text-red'>${modulo}</span> de <span class='text-red'>${curso}</span>, el día <span class='text-red'>${fechaFormateada}</span>, con una carga horaria de <span class='text-red'>${horas}hs</span>, mediante el formato <span class='text-red'>${formato}</span> en <span class='text-red'>${centro}</span> y el Póligono de tiro del Centro Argentino de Seguridad (CAS).`;

		document.getElementById("certificado-texto").innerHTML = certificadoText;

		document.getElementById("form").style.display = "none";
		document.getElementById("certificate").style.display = "flex";

		//ESTO EJECUTA LA DESCARGA

		html2canvas(document.querySelector(".certificado")).then(function (canvas) {
			var imgData = canvas.toDataURL("image/png");
			var doc = new jsPDF("p", "mm", "a4"); // Crea un nuevo documento PDF en formato A4

			var pageWidth = 210; // Ancho de la página en mm para formato A4
			var imageWidth = pageWidth * 0.9; // Anchura de la imagen es 90% del ancho de la página
			var imageHeight = imageWidth / 1.41; // Altura de la imagen es proporcional a su anchura

			// Añade la imagen al documento PDF con las dimensiones calculadas
			doc.addImage(
				imgData,
				"PNG",
				(pageWidth - imageWidth) / 2,
				10,
				imageWidth,
				imageHeight
			);

			doc.save("Certificado.pdf"); // Guarda el documento PDF
		});
	}
}
