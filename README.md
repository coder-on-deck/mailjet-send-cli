mailjet-send-cli
=================

Exposes a command line to send email

# Installation

```
npm install -g mailjet-send-cli
```


```
mailjet-send --help
```

```

      USAGE:

          export MAILJET_KEY=...
          export MAILJET_SECRET_KEY=...

          mailjet-send  \
           --from_email me@company.com \
           --from_name me  \
           --subject 'awesome sauce'  \
           --content 'awesome content' \
           --recipients me@somewhere.com;another@somewhere.com


      Arguments:

          --from_email -  Email address of sender

          --from_name -  Name of sender

          --content - Content of email

          --subject - Subject of email

          --recipients - Recipients values separated by semicolons

          --verbose - Will print debug log

          --silent - Will not print error

```

