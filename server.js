const fs = require('fs')
const { createServer } = require('https')
const { parse } = require('url')

const { green, underline, red } = require('kleur')
const next = require('next')

const development = process.env.NODE_ENV !== 'production'
const app = next({ dev: development })
const handle = app.getRequestHandler()

const httpsOptions = {
  key: fs.readFileSync('./certs/dev.key'),
  cert: fs.readFileSync('./certs/dev.crt'),
}

app.prepare().then(() => {
  createServer(httpsOptions, (request, response) => {
    const parsedUrl = parse(request.url, true)
    handle(request, response, parsedUrl)
  }).listen(3000, (error) => {
    if (error) throw error
    console.log(
      `${green('ready')} - is development ${development ? green('true') : red('false')}`
    )
    console.log(
      `${green('ready')} - ready on ${underline('https://music.marvin.digital:3000')}`
    )
  })
})
