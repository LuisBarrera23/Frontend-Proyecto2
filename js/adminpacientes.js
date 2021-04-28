function datos() {
    //var usuario=sessionStorage.usuario //inutilizado pero sirve para obtener quien inicio sesion
    var tablapacientes = document.querySelector('#tpacientes')
    var cadena = ''

    fetch('https://backend-202010223.herokuapp.com/mostrarpacientes', {
        method: 'Get',
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
            var contador = 1
            response.forEach(element => {
                cadena += `<tr>
                      <td>${contador}</td>
                      <td>${element.nombre}</td>
                      <td>${element.apellido}</td>
                      <td>${element.usuario}</td>
                      <td><button value=${element.id} onclick="verpaciente(this)" type="button" class="btn btn-outline-warning" style="width: 150px;">Ver detalles</button></td>
                      </tr>`
                contador++

            });
            tablapacientes.innerHTML = cadena
        })
}

function cargarpacientes() {
    Papa.parse(document.getElementById('archivopacientes').files[0], {
        download: true,
        header: true,
        complete: function (resultados) {
            resultados.data.map((data, index) => {
                guardarpacientes(data)
            })
        }
    })
    alert("Usuarios Cargados")
    datos();
}

function guardarpacientes(data) {
    console.log(data)
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


    fetch('https://backend-202010223.herokuapp.com/registrar', {
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

function verpaciente(boton) {
    var id = boton.value
    sessionStorage.setItem('ID', id)
    location.href = "perfilusuario.html"
}



function generarpdfpacientes() {
    var pdfp = new jsPDF();

    pdfp.text(20, 20, "Los usuarios de tipo Paciente registrados son: ");

    var columns = ["Id", "Nombre","Apellido",'Fecha de nacimiento','Sexo','Usuario','Contraseña','Telefono'];
    var data = []
    var objeto = []

    fetch('https://backend-202010223.herokuapp.com/mostrarpacientes', {
        method: 'Get',
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

            pdfp.save('mipdf.pdf');

            console.log(data)

        })
}