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

	let url = "https://www.gruposanmiguel.com.ar/Certificados/index.html?DNI=" + dni
	generateQRCode(url);


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
		//document.getElementById("cont-certificado").style.display = "flex";

		//ESTO EJECUTA LA DESCARGA
		// // Assuming you have an element with the id "cont-certificado"
		// html2canvas(document.getElementById("thebody")).then(function (canvas) {
		// 	var imgData = canvas.toDataURL("image/png");
		// 	var doc = new jsPDF("l"); // No specific page size or orientation
		
		// 	var pdfWidth = doc.internal.pageSize.getWidth();
		// 	var pdfHeight = doc.internal.pageSize.getHeight();
		
		// 	var contentAspectRatio = canvas.width / canvas.height;
		// 	var pdfAspectRatio = pdfWidth / pdfHeight;
		
		// 	var scale;
		
		// 	if (contentAspectRatio > pdfAspectRatio) {
		// 		// Scale based on width
		// 		scale = pdfWidth / canvas.width;
		// 	} else {
		// 		// Scale based on height
		// 		scale = pdfHeight / canvas.height;
		// 	}
		
		// 	var imageWidth = canvas.width * scale;
		// 	var imageHeight = canvas.height * scale;
		
		// 	// Add the image to the PDF document with the adjusted dimensions and positioning
		// 	doc.addImage(
		// 		imgData,
		// 		"PNG",
		// 		(pdfWidth - imageWidth) / 2, // Center the image horizontally
		// 		(pdfHeight - imageHeight) / 2, // Center the image vertically
		// 		imageWidth,
		// 		imageHeight
		// 	);
		
		// 	doc.save("Certificado.pdf"); // Save the PDF document
		// });
		
		

		

		
		
	}
}

function generateQRCode(url) {
    // clear any existing content
    document.getElementById('qrcode').innerHTML = "";
    let width = 80;
    let height = 80;
    // create a new QR code
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: url,
        width: width,
        height: height,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

