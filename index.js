const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000;
app.use(cors());
const baseUrl = process.env.BASE_URL ||`http://localhost:${port}`

const urlMaps = {}

const generateUrlCode = () => {
  const length = 6
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.get('/:urlCode', (req, res) => {
  const {urlCode} = req.params;
  if(!urlCode){
    res.status(409)
    return;
  }
  const redirectUrl = urlMaps[urlCode];
  res.redirect(302, redirectUrl);
})

app.get('/shorten/url', (req, res) => {
  const {url} = req.query;
  if(!url){
    res.status(409)
    return
  }
  const urlCode = generateUrlCode()
  urlMaps[urlCode] = url
  res.send(`${baseUrl}/${urlCode}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
