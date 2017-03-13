import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
var io = sailsIOClient(socketIOClient);
io.sails.url = 'https://rtttss-api.herokuapp.com';
export default io;
