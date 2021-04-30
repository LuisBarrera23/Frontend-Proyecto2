function cargarmedicamentos() {
    Papa.parse(document.getElementById('archivomedicamentos').files[0], {
        download: true,
        header: true,
        complete: function (resultados) {
            resultados.data.map((data, index) => {
                guardarmedicamentos(data)
            })
            datos()
        }
    })
    alert("Medicamentos Cargados")
}

function guardarmedicamentos(data) {
    console.log(data.Nombre)
    var nombre = data.Nombre
    var precio = data.Precio
    var descripcion = data.Descripcion
    var cantidad = data.Cantidad


    var objeto = {
        'nombre': nombre,
        'precio': precio,
        'descripcion': descripcion,
        'cantidad': cantidad
    }
    console.log(objeto)


    fetch('https://backend-202010223.herokuapp.com/registrarmedicamento', {
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

function vermedicamento(boton) {
    var id = boton.value
    sessionStorage.setItem('ID', id)
    location.href = "editarmedicamentos.html"
}



function generarpdfmedicamentos() {
    var pdfp = new jsPDF();

    pdfp.text(20, 20, "Los Medicamentos cargados en el sistema son: ");

    var columns = ["Id", "Nombre", 'Precio', 'Descripción', 'Cantidad'];
    var data = []
    var objeto = []

    fetch('https://backend-202010223.herokuapp.com/mostrarmedicamentos', {
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
                    "Q " + element.precio,
                    element.descripcion,
                    element.cantidad
                ]
                data.push(objeto)
            });
            pdfp.autoTable(columns, data,
                { margin: { top: 25 } }
            );

            var actual = new Date()
            pdfp.save(`Medicamentos ${actual.getDate()}/${actual.getMonth()}/${actual.getFullYear()}.pdf`);

            console.log(data)

        })
}

function eliminarmedicamento() {
    var id = sessionStorage.ID
    fetch(`https://backend-202010223.herokuapp.com/eliminarmedicamento/${id}`, {
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
            if (response.Mensaje = "El medicamento fue eliminado con exito") {
                location.href = "admin.html"
            }
        })
}



function modificarmedicamento() {

    var nombre = document.querySelector('#nombre').value
    var precio = document.querySelector('#precio').value
    var descripcion = document.querySelector('#descripcion').value
    var cantidad = document.querySelector('#cantidad').value

    if (nombre.length == 0 || precio.length == 0 || descripcion.length == 0 || cantidad.length == 0) {
        var cadena = ""
        if (nombre.length == 0) {
            cadena += "Nombre, "
        }
        if (precio.length == 0) {
            cadena += "Precio, "
        }
        if (descripcion.length == 0) {
            cadena += "Descripcion, "
        }
        if (cantidad.length == 0) {
            cadena += "Cantidad, "
        }
        alert("Por favor llenar los siguientes campos: " + cadena)
    } else {
        var objeto = {
            'nombre': nombre,
            'precio':precio,
            'descripcion':descripcion,
            'cantidad':cantidad,
            'id':sessionStorage.ID
        }
        console.log(objeto)



        fetch('https://backend-202010223.herokuapp.com/actualizarmedicamento', {
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
                if (response.Mensaje = "Medicamento modificado") {
                    location.href = "admin.html"
                }

            })
    }


}


function obtenerdatosmedicamento() {
    var id = sessionStorage.ID
    fetch(`https://backend-202010223.herokuapp.com/medicamento/${id}`, {
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
            document.querySelector('#precio').value = response.precio
            document.querySelector('#descripcion').value = response.descripcion
            document.querySelector('#cantidad').value = response.cantidad

        })
}