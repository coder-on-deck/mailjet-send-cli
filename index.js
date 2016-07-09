#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))

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

var Mailjet = require('node-mailjet').connect(process.env.MAILJET_KEY, process.env.MAILJET_SECRET_KEY)

var sendEmail = Mailjet.post('send')

var emailData = {
  'FromEmail': argv.from_email || 'mailjet@bot.com',
  'FromName': argv.from_name || 'mailjet bot',
  'Subject': argv.subject || 'default subject',
  'Text-part': argv.content || 'default content',
  'Recipients': argv.recipients.split(';').map(function (r) {
    return {'Email': r}
  })
}

if (argv.verbose) {
  console.info(emailData)
}

sendEmail
  .request(emailData)
  .then(function () {
    if (argv.verbose) {
      console.log('success', arguments)
    }
    process.exit(0)
  })
  .catch(function () {
    if (!argv.silent) {
      console.log('error', arguments)
    }
    process.exit(1)
  })
