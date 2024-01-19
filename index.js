import server from './server/_app.js'

server.listen(server.get('port'), ()=> console.log('port listen to 5000'));