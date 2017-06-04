import translate from './translate';

export default function (context, cb) { 
  cb(null, { text: translate() }); 
}