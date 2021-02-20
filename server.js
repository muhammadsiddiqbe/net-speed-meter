const express = require('express')
const ejs = require('ejs')
const NetworkSpeed = require('network-speed')

const TestNetworkSpeed = new NetworkSpeed()
const app = express()
const PORT = process.env.PORT || 8000

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')


app.get('/', (req, res) => {
  const url = (req.hostname)

  ;(async function download() {
    const options = {
      hostname: url,
      port: PORT,
      path: '/catchers/544b09b4599c1d0200000289',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const fileSizeInBytes = 10000000
    const speed = await TestNetworkSpeed.checkUploadSpeed(options, fileSizeInBytes)
    let mbs = (speed.mbps / 8 / 8 / 10).toFixed(1)
    // console.log(speed)

    res.render('index.html', { mbs })
  })()


})

app.listen(PORT, () => console.log(`http://127.0.0.1:${PORT}`))