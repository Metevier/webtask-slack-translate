import translate from './translate';

export default function (context, cb) { 
  translate(context.body.text, context.secrects.API_KEY, ({ translationText, isEphemeral }) => {
    cb(null, { text: translationText, response_type: isEphemeral ? 'emphemeral' : 'in_channel' }); 
  })
}