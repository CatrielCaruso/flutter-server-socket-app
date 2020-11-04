
const{io}=require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Braking Benjamin'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Héroes del silencio'));
bands.addBand(new Band('Metallica'));

//console.log(bands);



//Mensaje de Sockets

io.on('connection', client => {

    console.log('Cliente conectado!!');

    client.emit('active-bands',bands.getBands());


    
    client.on('disconnect', () => 
    
    { console.log('Cliente desconectado')});
  
  
    client.on('mensaje',(payload)=>{
  
       console.log('Mensaje!!!!',payload);
  
       io.emit('mensaje',{admin:'Nuevo mensaje!!!'})
  
    });

    client.on('vote-band',(payload)=>{

       //console.log(payload);
       bands.voteBands( payload.id );
       io.emit('active-bands',bands.getBands());

    });

    // Escuchar : add-band

    client.on('add-band',(payload)=>{
       
       const newBand= new Band(payload.name);

      
       bands.addBand(newBand);
       io.emit('active-bands',bands.getBands());

    });


    //Crear el evento: delete-band

    client.on('delete-band',(payload)=>{

        
      bands.deleteBand(payload.id);
      io.emit('active-bands',bands.getBands());


    });

   //  client.on('emitir-mensaje',(payload)=>{

   //    //console.log(payload);

   //     //io.emit('nuevo-mensaje',payload); //Emite a todos
   //     client.broadcast.emit('nuevo-mensaje',payload); //Emite a todos menos al que emitio
   //  })
  });