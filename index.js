#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
var request = require('request')

if (argv.help) {
  console.log(`
      USAGE:
      
          export MAILJET_KEY=...
          export MAILJET_SECRET_KEY=...
      
          mailjet-send  \\
           --from_email me@company.com \\
           --from_name me  \\
           --subject 'awesome sauce'  \\
           --content 'awesome content' \\
           --recipients me@somewhere.com;another@somewhere.com
          
          
      Arguments: 
          
          --from_email -  Email address of sender
          
          --from_name -  Name of sender
          
          --content - Content of email
          
          --subject - Subject of email
          
          --recipients - Recipients values separated by semicolons
          
          --verbose - Will print debug log
          
          --silent - Will not print error
  `)
  process.exit(0)
}

if (!process.env.MAILJET_KEY) {
  console.error('need to define MAILJET_KEY')
}

if (!process.env.MAILJET_SECRET_KEY) {
  console.error('need to define MAILJET_SECRET_KEY')
}

var requestData = {
  'method': 'POST',
  'url': 'https://api.mailjet.com/v3/send',
  // 'url' : 'https://' + process.env.MAILJET_KEY + ':' + process.env.MAILJET_SECRET_KEY + '@api.mailjet.com/v3/send',
  'auth': {
    'user': process.env.MAILJET_KEY,
    'pass': process.env.MAILJET_SECRET_KEY
  },
  'headers': {
    'Content-Type': 'application/json'
  },
  json: {
    'FromEmail': argv.from_email || 'mailjet@bot.com',
    'FromName': argv.from_name || 'mailjet bot',
    'Subject': argv.subject || 'default subject',
    'Text-part': argv.content || 'default content',
    'Html-part': argv.content || 'default content',
    'Recipients': argv.recipients.split(';').map(function (r) {
      return {'Email': r}
    })
  }
}

console.log(requestData)

request(requestData, function (err, response, body) {
  if (err) {
    console.log(err)
  } else {
    console.log('response', response.statusCode, response.body)
  }
})
