const endpoint = '/usuario'

const formulario = document.forms['formregistro']
console.log(formulario)
formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    let usuario = formulario.usuario.value
    let contraseña = formulario.contraseña.value
    let id_tip_usu = 1

    let newDatos = { usu: usuario, contraseña: contraseña, id_tip_usu: id_tip_usu }

    if (!newDatos.usu || !newDatos.contraseña) {
        document.querySelector('#mensajeCompletar').innerHTML = '*Complete todos los datos'
        document.querySelector('#mensajeCompletar').className += " bg-danger text-light";
        return
    } else {
        document.querySelector('#mensajeCompletar').innerHTML = ''
    }

    let nuevosDatosJson = JSON.stringify(newDatos)
    console.log(nuevosDatosJson)
    const enviarNewProducto = async () => {
        try {
            const enviarDatos = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: nuevosDatosJson
            })
            const respuesta = await enviarDatos.json()
            console.log(respuesta.mensaje)

            mostrarMensaje(respuesta.mensaje)
            setTimeout(() => { location.reload(); }, 3000)
        } catch (error) {
            console.log(error)
        }
    }
    enviarNewProducto()
})


  mostrarMensaje = (mensaje) => {
    console.log(mensaje)
    console.log(document.querySelector('#mensajeBack'))
    document.querySelector('#mensajeBack').className += " bg-warning";
    document.querySelector('#mensajeBack').innerHTML = mensaje
  }

  //eliminar producto
  const eliminar = (id) => {
    console.log(id)
    if (confirm('Seguro desea eliminar?')) {
      const eliminarProd = async () => {
        try {
          const res = await fetch(endpoint + '/' + id, {
            method: 'delete'
          })
          //obtengo respuesta
          const respuesta = await res.json()
          mostrarMensaje(respuesta.mensaje)
          setTimeout(() => { location.reload(); }, 3000)
        } catch (error) {
          mostrarMensaje('error al mostrar mensaje')
        }

      }

      eliminarProd()
    }
  }

  





  //---------------------------------------------------------

  //const respuesta = fetch('http://localhost:3000/productos')
  //.then(respuesta => respuesta.json())// respuesta = endpoint
  //.then(datos => mostrarProductos(datos));


  const formEditar = document.forms['formulario2']
  console.log(formEditar)
  const editar = (id) => {
    console.log(id)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    //abro formulario de editar 
    document.querySelector("#editarproducto").style.display = 'block'
    //contenedor de datos a editar
    let prodEditar = {}
    // recoorro los datos del json para ubicar el prod a editar
    productosRecibidos.filter(prod => {
      if (prod.id == id) {
        prodEditar = prod
      }
    })
    console.log(prodEditar)

    //Asignar los valores obtenidos al formulario
    formEditar.id.value = prodEditar.id
    formEditar.titulo.value = prodEditar.titulo
    formEditar.descripcion.value = prodEditar.descripcion
    formEditar.precio.value = prodEditar.precio
    formEditar.imagen.value = prodEditar.imagen
  }

  // formEditar.addEventListener('submit', (event) => {
  //   event.preventDefault();
  //   //creo objeto con nuevos datos
  //   const nuevosDatos = {
  //     titulo: formEditar.titulo.value,
  //     descripcion: formEditar.descripcion.value,
  //     precio: formEditar.precio.value,
  //     imagen: formEditar.imagen.value,
  //     id: formEditar.id.value
  //   }

  //   if (!nuevosDatos.id || !nuevosDatos.titulo || !nuevosDatos.descripcion || !nuevosDatos.precio) {
  //     document.querySelector('#mensajeCompletar2').innerHTML = '*Complete todos los datos'
  //     document.querySelector('#mensajeCompletar2').className += " bg-danger text-light";
  //     return
  //   }
  //   else {
  //     document.querySelector('#mensajeCompletar2').innerHTML = ''
  //     // return
  //   }

  //   // //validacion de campos vacios igual anterior 
  //   let nuevosDatosJson = JSON.stringify(nuevosDatos)
  //   console.log(nuevosDatosJson)
  //   const enviarNewDatos = async () => {
  //     try {
  //       const enviarDatos = await fetch(endpoint, {
  //         method: 'put',
  //         headers: {
  //           'content-type': 'application/json'
  //         },
  //         body: nuevosDatosJson
  //       })
  //       const respuesta = await enviarDatos.json()
  //       console.log(respuesta)
  //       mostrarMensaje(respuesta.mensaje)
  //     } catch (error) {
  //       mostrarMensaje('error al verificar datos')
  //     }
  //     setTimeout(() => { location.reload(); }, 1000)
  //   }
  //   enviarNewDatos();
  // }) 