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
                      <td><button value=${element.idcita} onclick="aceptarcita(this)" type="button" class="btn btn-outline-success" style="width: 150px;">Aceptar</button><button value=${element.idcita} onclick="rechazarcita(this)" type="button" class="btn btn-outline-danger" style="width: 150px; margin-left: 5px;">Rechazar</button></td>
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

function rechazarcita(boton) {
    var idcita = boton.value
    console.log(idcita)
    var objeto = {
        'idcita': idcita,
        'doctor': " ",
        'estado': "Rechazada",
        'iddoctor': -1
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

function completarcita(checkbox) {
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

function generarreceta() {
    var dato = document.querySelector('#fecha').value
    var resFecha = dato.split("-")
    var reversedFecha = resFecha.reverse()
    var fecha = reversedFecha.join('-')
    var paciente = document.querySelector('#paciente').value
    var padecimiento = document.querySelector('#padecimiento').value
    var descripcion = document.querySelector('#descripcion').value

    
    console.log(fecha)
    console.log(paciente)
    console.log(padecimiento)
    console.log(descripcion)

    var objeto = []

    if (fecha.length == 0 || paciente.length == 0 || padecimiento.length == 0 || descripcion.length == 0) {
        var cadena = ""
        if (fecha.length == 0) {
            cadena += "Fecha, "
        }
        if (paciente.length == 0) {
            cadena += "paciente, "
        }
        if (padecimiento.length == 0) {
            cadena += "padecimiento, "
        }
        if (descripcion.length == 0) {
            cadena += "descripcion, "
        }
        alert("Por favor llenar los siguientes campos: " + cadena)
    } else {
        var objeto2 = {
            'nombre': padecimiento.toLowerCase()
        }
        console.log(objeto2)
    
    
        fetch('https://backend-202010223.herokuapp.com/verificarenfermedad', {
            method: 'POST',
            body: JSON.stringify(objeto2),
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
    
        objeto = [
            fecha,
            paciente,
            padecimiento,
        ]

        var pdfp = new jsPDF();
        var actual = new Date()
        data = []
        data.push(objeto)

        pdfp.setFontSize(10)
        pdfp.text(20, 10, `Emitida: ${actual.getDate()}/${actual.getMonth() + 1}/${actual.getFullYear()}`);
        pdfp.setFontSize(20)
        pdfp.text(20, 20, `Receta del Doctor ${sessionStorage.nombre}`);
        var columns = ["Fecha", "Paciente", "Padecimiento"];
        pdfp.autoTable(columns, data,
            { margin: { top: 25 } }
        );
        pdfp.setFontSize(15)
        pdfp.text(20, 47, "Descripcion:");
        
        pdfp.setFontSize(12)
        pdfp.text(20, 54, `${descripcion}`);
        pdfp.save(`Receta ${actual.getDate()}/${actual.getMonth() + 1}/${actual.getFullYear()}.pdf`);
    }

}