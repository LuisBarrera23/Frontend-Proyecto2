function vercitas() {
    console.log(sessionStorage.nombre)
    var iddoctor = sessionStorage.ID
    document.querySelector('#nombredoctor').innerHTML = sessionStorage.nombre
    var tablacitas = document.querySelector('#tpendientes')
    var cadena = ''

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
                if (element.estado == "Pendiente") {
                    cadena += `<tr>
                      <td>${element.fecha}</td>
                      <td>${element.hora}</td>
                      <td>${element.paciente}</td>
                      <td>${element.motivo}</td>
                      <td>${element.doctor}</td>
                      <td>${element.estado}</td>
                      <td><button value=${element.idcita} onclick="aceptarcita(this)" type="button" class="btn btn-outline-success" style="width: 150px;">Aceptar</button></td>
                      </tr>`
                }
            });
            tablacitas.innerHTML = cadena
        })

    var tablacitas2 = document.querySelector('#tasignadas')
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
                if (element.iddoctor == iddoctor && element.estado == "Aceptada") {
                    cadena2 += `<tr>
                      <td>${element.fecha}</td>
                      <td>${element.hora}</td>
                      <td>${element.paciente}</td>
                      <td>${element.motivo}</td>
                      <td>${element.doctor}</td>
                      <td>${element.estado}</td>
                      <td><label><input type="checkbox" id="cbox1" value=${element.idcita} onclick="completarcita(this)">Cita completada</label></td>
                      </tr>`
                }
            });
            tablacitas2.innerHTML = cadena2
        })

    var tablacitas3 = document.querySelector('#thistorial')
    var cadena3 = ''

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
                if (element.iddoctor == iddoctor && element.estado == "Completada") {
                    cadena3 += `<tr>
                      <td>${element.fecha}</td>
                      <td>${element.hora}</td>
                      <td>${element.paciente}</td>
                      <td>${element.motivo}</td>
                      <td>${element.doctor}</td>
                      <td>${element.estado}</td>
                      </tr>`
                }
            });
            tablacitas3.innerHTML = cadena3
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
                        location.href = "doctor.html"
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

function aceptarcita(boton) {
    var idcita = boton.value
    console.log(idcita)
    var objeto = {
        'idcita': idcita,
        'doctor': sessionStorage.nombre,
        'estado': "Aceptada",
        'iddoctor': sessionStorage.ID
    }
    console.log(objeto)



    fetch('https://backend-202010223.herokuapp.com/actualizarcita', {
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
            if (response.Mensaje = "Cita actualizada con exito") {
                vercitas()
            }

        })
}

function completarcita(checkbox){
    var idcita = checkbox.value
    console.log(idcita)
    var objeto = {
        'idcita': idcita,
        'doctor': sessionStorage.nombre,
        'estado': "Completada",
        'iddoctor': sessionStorage.ID
    }
    console.log(objeto)



    fetch('https://backend-202010223.herokuapp.com/actualizarcita', {
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
            if (response.Mensaje = "Cita actualizada con exito") {
                vercitas()
            }

        })
}