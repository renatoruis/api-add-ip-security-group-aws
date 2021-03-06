const express = require('express')
const app = express()
const port = 3000
const exec = require('child_process').exec;

app.get('/', (req, res) => {
  var ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  res.send(ip)
})

//path to verify if ip is in the list
app.get('/verify', (req, res) => {
  var ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  var cmd = `src/scripts/verify-ip.sh ${ip}`;
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      res.send(`Error: ${error}`)
    }else{
      res.send(stdout) // Print the public ip address
    }
  });
})

app.get('/addip', (req, res) => {
  var ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  var cmd = `src/scripts/add-ip.sh ${ip}`;
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      res.send(`Error: ${error}`)
    }else{
      res.send(stdout) // Print the public ip address
    }
  });
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})