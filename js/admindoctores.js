function cargardoctores() {
    Papa.parse(document.getElementById('archivodoctores').files[0], {
        download: true,
        header: true,
        complete: function (resultados) {
            resultados.data.map((data, index) => {
                guardardoctores(data)
            })
            datos()
        }
    })
    alert("Usuarios Cargados")
}

function guardardoctores(data) {
    console.log(data)
    var nombre = data.Nombre
    var apellido = data.Apellido
    var fecha = data.Fecha
    var sexo = data.Sexo
    var usuario = data.Usuario
    var contraseña = data.Contraseña
    var especialidad = data.Especialidad
    var telefono = data.Telefono

    var objeto = {
        'nombre': nombre,
        'apellido': apellido,
        'fecha': fecha,
        'sexo': sexo,
        'usuario': usuario,
        'contraseña': contraseña,
        'especialidad': especialidad,
        'telefono': telefono
    }
    console.log(objeto)


    fetch('https://backend-202010223.herokuapp.com/registrardoctor', {
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

function verdoctor(boton) {
    var id = boton.value
    sessionStorage.setItem('ID', id)
    location.href = "perfildoctor.html"
}



function generarpdfdoctores() {
    var pdfp = new jsPDF();

    pdfp.text(20, 20, "Los usuarios de tipo Doctor registrados son: ");

    var columns = ["Id", "Nombre", "Apellido", 'Especialidad', 'Fecha de nacimiento', 'Sexo', 'Usuario', 'Contraseña', 'Telefono'];
    var data = []
    var objeto = []

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
                objeto = [
                    element.id,
                    element.nombre,
                    element.apellido,
                    element.especialidad,
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
            pdfp.save(`Doctores ${actual.getDate()}/${actual.getMonth()}/${actual.getFullYear()}.pdf`);

            console.log(data)

        })
}

function eliminardoctor() {
    var id = sessionStorage.ID
    fetch(`https://backend-202010223.herokuapp.com/eliminardoctor/${id}`, {
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

function modificardoctor() {

    var nombre = document.querySelector('#nombre').value
    var apellido = document.querySelector('#apellido').value
    var especialidad = document.querySelector('#especialidad').value
    var fecha = document.querySelector('#fecha').value
    var sexo = document.querySelector('#sexo').value
    var usuario = document.querySelector('#usuario').value
    var contraseña = document.querySelector('#contraseña').value
    var telefono = document.querySelector('#telefono').value

    if (nombre.length == 0 || apellido.length == 0 || fecha.length == 0 || sexo.length == 0 || usuario.length == 0 || contraseña.length == 0 || especialidad.length == 0) {
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
        if (especialidad.length == 0) {
            cadena += "Especialidad, "
        }
        alert("Por favor llenar los siguientes campos: " + cadena)
    } else {
        if (contraseña.length >= 8) {
            var objeto = {
                'nombre': nombre,
                'apellido': apellido,
                'especialidad': especialidad,
                'fecha': fecha,
                'sexo': sexo,
                'usuario': usuario,
                'contraseña': contraseña,
                'telefono': telefono,
                'id': sessionStorage.ID
            }
            console.log(objeto)



            fetch('https://backend-202010223.herokuapp.com/actualizarmedico', {
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


function obtenerdatosdoctor() {
    var id = sessionStorage.ID
    fetch(`https://backend-202010223.herokuapp.com/doctor/${id}`, {
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
            document.querySelector('#especialidad').value = response.especialidad
            document.querySelector('#fecha').value = response.fecha
            document.querySelector('#sexo').value = response.sexo
            document.querySelector('#usuario').value = response.usuario
            document.querySelector('#contraseña').value = response.contraseña
            document.querySelector('#telefono').value = response.telefono

        })
}

function topdoctores() {
    var pdfp = new jsPDF();

    pdfp.text(20, 20, "Los doctores con mas citas atendidas son: ");

    var columns = ['Puesto','Nombre','Cantidad de Citas Atendidas'];
    var data = []
    var objeto = []

    fetch('https://backend-202010223.herokuapp.com/topdoctores', {
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
                    element.puesto,
                    element.nombre,
                    element.citasatendidas
                ]
                data.push(objeto)
            });
            pdfp.autoTable(columns, data,
                { margin: { top: 25 } }
            );

            var actual = new Date()
            pdfp.save(`Reporte Doctores ${actual.getDate()}/${actual.getMonth()+1}/${actual.getFullYear()}.pdf`);

            console.log(data)

        })
}

function topenfermedades() {
    var pdfp = new jsPDF();

    pdfp.text(20, 20, "Las enfermedades mas comunes atendidas en el Hospital Angeles son: ");

    var columns = ['Puesto','Nombre de La Enfermedad','Cantidad de registros'];
    var data = []
    var objeto = []

    fetch('https://backend-202010223.herokuapp.com/topenfermedades', {
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
                    element.puesto,
                    element.nombre,
                    element.cantidad
                ]
                data.push(objeto)
            });
            pdfp.autoTable(columns, data,
                { margin: { top: 25 } }
            );

            var actual = new Date()
            pdfp.save(`Reporte Enfermedades ${actual.getDate()}/${actual.getMonth()+1}/${actual.getFullYear()}.pdf`);

            console.log(data)

        })
}
