require('colors')
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa, 
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
    } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
 

const main = async() => {
    console.log('Hola Mundo');
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    
    if ( tareasDB){
        // Establecer tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ')
                tareas.crearTarea( desc );
            break;
               
            case '2':
                tareas.listadoCompleto();
            break;

            case '3': // Completadas
                tareas.listarCompletadas(true);
            break;
        
            case '4': // Pendientes
                tareas.listarCompletadas(false);
            break;
        
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas = new Date().toISOString;
            break;
        
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== 0){
                    const ok = await confirmar('Esta seguro?');
                    
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente')
                    }
                }
            break;
        
        }

        guardarDB( tareas.listadoArr);

        await pausa();

    } while (opt !== '0');



    // pausa();
}


main();