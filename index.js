const express = require('express')
const app = express()
const port = 3000
const command =  require('child_process').exec

app.get('/', (req, res) => {
  //get public ip address from request
  var ip = req.headers['X-Real-IP '] || req.connection.remoteAddress;
  res.send(`Your IP is: ${ip}`)
})

//path to verify if ip is in the list
app.get('/verify', (req, res) => {
  const ip = req.headers['X-Real-IP '];
  const cmd = `verify-ip.sh ${ip}`
  command(cmd, (err, stdout, stderr) => {
    if (err) {
      res.send(err)
    } else {
      res.send(stdout)
    }
  }
  )
})

app.get('/addip', (req, res) => {
  // get the ip address from the request
  const ip = req.headers['X-Real-IP '];

  // execute shell command to add the ip to the whitelist
  const cmd = `add-ip-to-sg.sh ${ip}`
  console.log(cmd)
  require('child_process').exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
      res.status(500).send(err)
    } else {
      res.send(stdout)
    }
  }
  )

})

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})