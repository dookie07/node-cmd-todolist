const Tarea = require('./tarea');

class Tareas{

    _listado = {
        'abc': 123
    };


    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;
    }

    constructor(){
        this._listado = {}; 
    }

    borrarTarea (id=''){
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = []){

        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        this.listadoArr.forEach ((tarea, i) =>{
          
            const idx = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ? 'Completado'.green
                            : 'Pendiente'.red

            console.log(`${idx}. ${ desc } :: ${ estado }`);
        });
    }

    listarCompletadas (completadas = true){
        
        console.log( )
        let index = 0;

        this.listadoArr.forEach (tarea =>{
          
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ? 'Completado'.green
                            : 'Pendiente'.red

            if (completadas) {
                // Mostar completadas
                if (completadoEn){
                    index +=1;
                console.log(`${(index.toString() + '.'.green)} ${ desc } :: ${ completadoEn.blue }`);
                }
                
            } else {
                //Mostrar pendientes
                if (!completadoEn){
                    index +=1;
                console.log(`${(index.toString() + '.'.green)}. ${ desc } :: ${ estado }`);
                }
            }
            

        });
    
    
    
    }
    
    
    toggleCompletadas( id = []){

        ids.forEach(id=>{

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString()
            }

        });

        this.listadoArr.forEach( tarea => {

            if (!ids.includes(tarea.id)){
                
                this._listado[tarea.id].completadoEn = null;

                // Via clasica
                // const tarea = this._listado[id];
                // tarea.completadoEn = null;
            }

        })

    }

}


module.exports = Tareas;