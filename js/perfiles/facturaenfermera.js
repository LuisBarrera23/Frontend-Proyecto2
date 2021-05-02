function generarfactura() {
    var dato = document.querySelector('#fecha').value
    var resFecha = dato.split("-")
    var reversedFecha = resFecha.reverse()
    var fecha = reversedFecha.join('-')
    var paciente = document.querySelector('#paciente').value
    var select = document.querySelector('#doctores')
    var doctor = select.options[select.selectedIndex].text
    var consulta = document.querySelector('#consulta').value
    var operacion = document.querySelector('#operacion').value
    var internado = document.querySelector('#internado').value
    var total = document.querySelector('#total').value

    console.log(fecha)
    console.log(paciente)
    console.log(doctor)
    console.log(consulta)
    console.log(operacion)
    console.log(internado)
    console.log(total)
    var objeto = []

    if (fecha.length == 0 || paciente.length == 0 || doctor.length == 0 || consulta.length == 0 || total.length == 0) {
        var cadena = ""
        if (fecha.length == 0) {
            cadena += "Fecha, "
        }
        if (paciente.length == 0) {
            cadena += "paciente, "
        }
        if (doctor.length == 0) {
            cadena += "doctor, "
        }
        if (consulta.length == 0) {
            cadena += "consulta, "
        }
        if (total.length == 0) {
            cadena += "total"
        }
        alert("Por favor llenar los siguientes campos: " + cadena)
    } else {
        objeto = [
            fecha,
            paciente,
            doctor,
            "Q" + consulta,
            "Q" + operacion,
            "Q" + internado,
            "Q" + total,
        ]
        imprimirpdf(objeto)
    }

}

function vercitas() {
    console.log(sessionStorage.nombre)
    document.querySelector('#nombreenfermera').innerHTML = sessionStorage.nombre

    var cadena2 = ''
    var opciones = document.querySelector('#doctores')

    fetch('https://backend-202010223.herokuapp.com/mostrarmedicos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response => {
            response.forEach(element => {
                cadena2 += `
                <option value="${element.id}" name="${element.nombre} ${element.apellido}">${element.nombre} ${element.apellido}</option>
                `

            });
            opciones.innerHTML = cadena2
        })

}

function imprimirpdf(objeto) {
    var pdfp = new jsPDF();
    var actual = new Date()
    data = []
    data.push(objeto)

    pdfp.setFontSize(10)
    pdfp.text(20, 10, `Emitida: ${actual.getDate()}/${actual.getMonth()+1}/${actual.getFullYear()}`);
    pdfp.setFontSize(20)
    pdfp.text(20, 20, "Factura por servicios hospitalarios Angeles");
    var columns = ["Fecha", "Paciente", "Doctor", 'Precio Consulta', 'Costo Operacion', 'Costo Internado', 'Total'];
    pdfp.autoTable(columns, data,
        { margin: { top: 25 } }
    );   
    pdfp.save(`Factura ${actual.getDate()}/${actual.getMonth()+1}/${actual.getFullYear()}.pdf`);
}