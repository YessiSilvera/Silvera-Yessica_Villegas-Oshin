//   TURNOS

async function obtenerSelectPacientes() {
    try {
        const response = await fetch('http://localhost:8080/pacientes/listar');
        
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
  
        const listadoPacientes = await response.json();

        const paciente_select = document.querySelector(".paciente-select")
        let pacientesSelectHtml = "<option selected>Seleccione...</option>";
        listadoPacientes.forEach(paciente=>{
            pacientesSelectHtml+=`<option value="${paciente.id}">${paciente.dni} - ${paciente.nombre} ${paciente.apellido}</option>`
        })
        paciente_select.innerHTML=pacientesSelectHtml;

        return listadoPacientes;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
  }

  async function obtenerSelectOdontologos() {
    try {
        const response = await fetch('http://localhost:8080/odontologos/listar');
        
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
  
        const listadoOdontologos = await response.json();

        const odontologo_select = document.querySelector(".odontologo_select")
        let OdontologosSelectHtml = "<option selected>Seleccione...</option>";
        listadoOdontologos.forEach(odontologo=>{
            OdontologosSelectHtml+=`<option value="${odontologo.id}">${odontologo.numMatricula} - ${odontologo.nombre} ${odontologo.apellido}</option>`
        })
        odontologo_select.innerHTML=OdontologosSelectHtml;
      
        return listadoOdontologos;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
  }


async function obtenerListadoTurnos(){
    const tablaTurnos = document.querySelector(".tablaTurnos")
    tablaTurnos.innerHTML="";
    try {
        const response = await fetch('http://localhost:8080/turnos/listar');
        
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
  
        const listadoTurnos = await response.json();
        console.log(listadoTurnos); // Mostrar el listado en la consola
  
        let turnosHtml = "";
        listadoTurnos.forEach(turno => {
            const dateTimeString = turno.fechaYHora;
            const date = new Date(dateTimeString);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            const readableDate = date.toLocaleDateString('es-ES', options);

          turnosHtml += `<tr>
                              <th scope="row">${turno.id}</th>
                              <td>${turno.pacienteDtoSalida.nombre}</td>
                              <td>Dr. ${turno.odontologoDtoSalida.nombre}</td>
                              <td>${readableDate}</td>
                              <td>  
                                  <a class="text-primary px-3" href="#" onclick="cargarInputsTurno(${turno.id})" >
                                      <i class="bi bi-pen"></i>
                                  </a>
                                  <a class="text-primary px-3" href="#" onclick="eliminarTurno(${turno.id})">
                                      <i class="bi bi-trash"></i>
                                  </a>
                              </td>                  
                          </tr>`
        });
      
       
      tablaTurnos.innerHTML = turnosHtml;
      
        return listadoTurnos;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
  }

obtenerSelectPacientes();
obtenerSelectOdontologos();
obtenerListadoTurnos();

function validarFormulario() {
    const formulario = document.querySelector('#turnoForm');
    console.log(formulario)
    const inputs = formulario.querySelectorAll('input, textarea, select');
    let formularioValido = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            formularioValido = false;
            input.style.border = "1px solid red";
        } else {
            input.style.border = "";

        }
    });

    return formularioValido;
}

function resetearFormulario(){
    document.querySelector("#turnoForm").reset();
    obtenerSelectPacientes();
    obtenerSelectOdontologos();
    document.querySelector("#id_turno").innerHTML = "";
    const formulario = document.querySelector('#turnoForm');
    const inputs = formulario.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
            input.style.border = "";
    });
}

  // Registrar Turno
  async function registrarTurno(){
      if(!validarFormulario()){
          Swal.fire({
              icon: "error",
              title: "Complete todos los campos del formulario",
            });
      } else {
        const fecha = document.querySelector("#fecha").value;
        const hora = document.querySelector("#hora").value;
        const fechaYHora = `${fecha}T${hora}:00`
        const datosTurno = {
          odontologoId : document.querySelector("#pacienteSelect").value,
          pacienteId : document.querySelector("#odontologoSelect").value,
          fechaYHora : fechaYHora
        };
        console.log(datosTurno);
        Swal.fire({
            title: "¿Deseas guardar este Turno?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No"
        }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch('http://localhost:8080/turnos/registrar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datosTurno)
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }

                    const resultado = await response.json();
                    console.log(resultado); // Mostrar la respuesta en la consola
                    obtenerListadoTurnos();
                    return resultado;
                } catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                }
            }
         });
      }
      }

async function cargarInputsTurno(id){
    resetearFormulario();
    try {
        const response = await fetch(`http://localhost:8080/turnos/${id}`);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const turno = await response.json();

        document.querySelector("#id_turno").innerHTML = turno.id
        document.querySelector("#pacienteSelect").value = turno.pacienteDtoSalida.id;
        document.querySelector("#odontologoSelect").value = turno.odontologoDtoSalida.id;

        const fechaYHora= turno.fechaYHora;
        document.querySelector("#fecha").value = fechaYHora.split("T")[0];
        document.querySelector("#hora").value = fechaYHora.split("T")[1];

        return turno;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

 }

  // Eliminar Turno

  async function eliminarTurno(id) {
    Swal.fire({
            title: `Estas seguro de eliminar este turno ID: ${id}`,
            text: "Esta acción no se puede revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: "Cancelar"
          }).then(async(result) => {
            if ( result.isConfirmed) {
                const url = `http://localhost:8080/turnos/eliminar?id=${id}`;
                try {
                    const response = await fetch(url, {
                        method: 'DELETE'
                    });

                    if (!response.ok) {
                        Swal.fire({
                            title: `No se pudo eliminar el turno`,
                            text: response,
                            icon: "error"
                          });
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    Swal.fire({
                        title: `Eliminado turno ID: ${id}`,
                        icon: "success"
                      });
                    obtenerListadoTurnos();
                    console.log('Turno eliminado correctamente');
                } catch (error) {
                    Swal.fire({
                        title: `No se pudo eliminar el turno`,
                        icon: "error"
                      });
                    console.error('There was a problem with the fetch operation:', error);
                }

            }
          });
  }

   async function actulizarTurno(id){
      const fecha = document.querySelector("#fecha").value;
      const hora = document.querySelector("#hora").value;
      const fechaYHoraConcat = `${fecha}T${hora}:`
      const datosTurno = {
          odontologoId : document.querySelector("#pacienteSelect").value,
          pacienteId : document.querySelector("#odontologoSelect").value,
          fechaYHora: fechaYHoraConcat
      };

      console.log(datosTurno);

      Swal.fire({
          title: `¿Confirmas la edición de este turno?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar"
        }).then(async(result) => {
          if ( result.isConfirmed) {
              try {
                  const response = await fetch(`http://localhost:8080/turnos/actualizar/${id}`, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(datosTurno)
                  });


              if (!response.ok) {
                  throw new Error('Network response was not ok ' + response.statusText);
              }

              const resultado = await response.json();
              Swal.fire({
                  title: `Turno guardado`,
                  icon: "success"
                });
              obtenerListadoTurnos();
              location.reload(true);
              return resultado;
              } catch (error) {
                  Swal.fire({
                      title: `No se pudo guardar el turno`,
                      icon: "error"
                    });
                  console.error('There was a problem with the fetch operation:', error);
              }
          }
      });
  }

function decisionRegistrarOEditar(){
    const idRegistro = document.querySelector("#id_turno").innerHTML

    idRegistro.trim() !== '' ? actulizarTurno(parseInt(idRegistro)) : registrarTurno();
}

  document.querySelector("#botonRegistrarTurno").addEventListener("click", decisionRegistrarOEditar);

  document.querySelector("#botonCancelar").addEventListener("click", resetearFormulario);
  