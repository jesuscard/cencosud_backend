const {io} = require('../server')


io.on('connection', (client) => {
    console.log('Conexión lista');

    client.on('disconnect',()=>{
        console.log('Cliente Desconectado')
   })

});

