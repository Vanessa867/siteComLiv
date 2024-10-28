import Parse from 'parse/dist/parse.min.js';

const Parse = require('parse/node');

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  '17Ffa9YqBaDzWsibw2D9eq7hTbjx5F8ibfPC2atM', // This is your Application ID
  'gDDhld4NCU6owthXv3pljJrVmQfxrCn9LKwR5Jpm', // This is your Javascript key
  'LlxAYRFnQnDNMZmszRFjNFx4Ro6hrDgeoTmBYi8j' // This is your Master key (never use it in the frontend)
);