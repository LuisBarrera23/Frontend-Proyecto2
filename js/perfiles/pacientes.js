function obtenerdatospaciente() {
    var id = sessionStorage.ID
    fetch(`https://backend-202010223.herokuapp.com/paciente/${id}`, {
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

function modificarpaciente() {

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



            fetch('https://backend-202010223.herokuapp.com/actualizarpaciente', {
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
                        location.href = "paciente.html"
                    }

                })

        } else {
            alert("su contraseña debe tener al menos 8 caracteres")
        }
    }


}

function guardarcita() {
    var id = sessionStorage.ID
    var hora = document.querySelector('#hora').value
    var dato = document.querySelector('#fecha').value
    var resFecha = dato.split("-")
    var reversedFecha = resFecha.reverse()
    var fecha = reversedFecha.join('-')
    var motivo = document.querySelector('#motivo').value

    var objeto = {
        'idpaciente': id,
        'hora': hora,
        'fecha': fecha,
        'motivo': motivo
    }
    console.log(objeto)


    fetch('https://backend-202010223.herokuapp.com/registrarcita', {
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
            alert(response.Mensaje)
            vercitas()
        })


}

function vercitas() {
    console.log(sessionStorage.nombre)
    document.querySelector('#nombrepaciente').innerHTML=sessionStorage.nombre
    var id = sessionStorage.ID
    var tablapacientes = document.querySelector('#tcitasactuales')
    var tablapacientes2 = document.querySelector('#tcitashistorial')
    var cadena = ''
    var cadena2 = ''

    fetch('https://backend-202010223.herokuapp.com/mostrarcitas', {
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
                if (element.idpaciente == id && (element.estado=="Pendiente"||element.estado=="Aceptada")) {
                    cadena += `<tr>
                      <td>${element.fecha}</td>
                      <td>${element.hora}</td>
                      <td>${element.motivo}</td>
                      <td>${element.doctor}</td>
                      <td>${element.estado}</td>
                      </tr>`
                }
                if (element.idpaciente == id && (element.estado=="Rechazada"||element.estado=="Completada")) {
                    cadena2 += `<tr>
                      <td>${element.fecha}</td>
                      <td>${element.hora}</td>
                      <td>${element.motivo}</td>
                      <td>${element.doctor}</td>
                      <td>${element.estado}</td>
                      </tr>`
                }

            });
            tablapacientes.innerHTML = cadena
            tablapacientes2.innerHTML = cadena2
        })
}