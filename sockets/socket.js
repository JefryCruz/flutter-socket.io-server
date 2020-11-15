const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('El Rey León'));
bands.addBand( new Band('El Rey Arturo'));
bands.addBand( new Band('Moana'));
bands.addBand( new Band('Los Pitufos'));
bands.addBand( new Band('Iron Man'));

console.log(bands);

//Mensajes de Sockets
io.on('connection', client => {
    //client.on('event', data => { /* … */ });
    console.log('Cliente conectado');

    client.emit('acive-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });

    client.on('Mensaje', (payload) => {
        console.log('Mensaje', payload);
        io.emit('Mensaje', { admin: 'Nuevo msj' });
    });

    // client.on('emitir-mensaje', (payload) => {
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // });

    //io es el servidor, escuchan todos 
    //Client lo escuchan todos los usuarios conectados
    //Client.broadcast lo esucchan todos los usuarios conectados a exección de quien emite el mensaje
    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('acive-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand.name);
        io.emit('acive-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        // const newBand = new Band(payload.name);
        bands.deleteBand(payload.id);
        io.emit('acive-bands', bands.getBands());
    });
  });