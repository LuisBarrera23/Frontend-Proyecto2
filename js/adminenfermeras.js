function cargarenfermeras() {
    Papa.parse(document.getElementById('archivoenfermeras').files[0], {
        download: true,
        header: true,
        complete: function (resultados) {
            resultados.data.map((data, index) => {
                guardarenfermeras(data)
            })
            datos()
        }
    })
    alert("Usuarios Cargados")
}

function guardarenfermeras(data) {
    console.log(data.Nombre)
    var nombre = data.Nombre
    var apellido = data.Apellido
    var fecha = data.Fecha
    var sexo = data.Sexo
    var usuario = data.Usuario
    var contraseña = data.Contraseña
    var telefono = data.Telefono

    var objeto = {
        'nombre': nombre,
        'apellido': apellido,
        'fecha': fecha,
        'sexo': sexo,
        'usuario': usuario,
        'contraseña': contraseña,
        'telefono': telefono
    }
    console.log(objeto)


    fetch('https://backend-202010223.herokuapp.com/registrarenfermera', {
        method: 'POST',
        body: JSON.stringify(objeto),
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
            console.log(response.Mensaje)
        })

}

function verenfermera(boton) {
    var id = boton.value
    sessionStorage.setItem('ID', id)
    location.href = "perfilenfermera.html"
}



function generarpdfenfermeras() {
    var pdfp = new jsPDF();

    pdfp.text(20, 20, "Los usuarios de tipo Enfermera registrados son: ");

    var columns = ["Id", "Nombre", "Apellido", 'Fecha de nacimiento', 'Sexo', 'Usuario', 'Contraseña', 'Telefono'];
    var data = []
    var objeto = []

    fetch('https://backend-202010223.herokuapp.com/mostrarenfermeras', {
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
                objeto = [
                    element.id,
                    element.nombre,
                    element.apellido,
                    element.fecha,
                    element.sexo,
                    element.usuario,
                    element.contraseña,
                    element.telefono
                ]
                data.push(objeto)
            });
            pdfp.autoTable(columns, data,
                { margin: { top: 25 } }
            );

            var actual = new Date()
            pdfp.save(`Enfermeras ${actual.getDate()}/${actual.getMonth()}/${actual.getFullYear()}.pdf`);

            console.log(data)

        })
}

function eliminarenfermera() {
    var id = sessionStorage.ID
    fetch(`https://backend-202010223.herokuapp.com/eliminarenfermera/${id}`, {
        method: 'DELETE',
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
            console.log(response.Mensaje)
            alert(response.Mensaje)
            if (response.Mensaje = "El usuario fue eliminado con exito") {
                location.href = "admin.html"
            }
        })
}



function modificarenfermera() {

    var nombre = document.querySelector('#nombre').value
    var apellido = document.querySelector('#apellido').value
    var fecha = document.querySelector('#fecha').value
    var sexo = document.querySelector('#sexo').value
    var usuario = document.querySelector('#usuario').value
    var contraseña = document.querySelector('#contraseña').value
    var telefono = document.querySelector('#telefono').value

    if (nombre.length == 0 || apellido.length == 0 || fecha.length == 0 || sexo.length == 0 || usuario.length == 0 || contraseña.length == 0) {
        var cadena = ""
        if (nombre.length == 0) {
            cadena += "Nombre, "
        }
        if (apellido.length == 0) {
            cadena += "Apellido, "
        }
        if (fecha.length == 0) {
            cadena += "Fecha, "
        }
        if (sexo.length == 0) {
            cadena += "Sexo, "
        }
        if (usuario.length == 0) {
            cadena += "Nombre de Usuario, "
        }
        if (contraseña.length == 0) {
            cadena += "Contraseña, "
        }
        alert("Por favor llenar los siguientes campos: " + cadena)
    } else {
        if (contraseña.length >= 8) {
            var objeto = {
                'nombre': nombre,
                'apellido': apellido,
                'fecha': fecha,
                'sexo': sexo,
                'usuario': usuario,
                'contraseña': contraseña,
                'telefono': telefono,
                'id': sessionStorage.ID
            }
            console.log(objeto)



            fetch('https://backend-202010223.herokuapp.com/actualizarenfermera', {
                method: 'PUT',
                body: JSON.stringify(objeto),
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
                    alert(response.Mensaje)
                    if (response.Mensaje = "Su perfil ha sido modificado") {
                        location.href = "admin.html"
                    }

                })

        } else {
            alert("su contraseña debe tener al menos 8 caracteres")
        }
    }


}


function obtenerdatosenfermera() {
    var id = sessionStorage.ID
    fetch(`https://backend-202010223.herokuapp.com/enfermera/${id}`, {
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
            document.querySelector('#nombre').value = response.nombre
            document.querySelector('#apellido').value = response.apellido
            document.querySelector('#fecha').value = response.fecha
            document.querySelector('#sexo').value = response.sexo
            document.querySelector('#usuario').value = response.usuario
            document.querySelector('#contraseña').value = response.contraseña
            document.querySelector('#telefono').value = response.telefono

        })
}