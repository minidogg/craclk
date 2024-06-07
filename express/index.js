import express from 'express';
import * as manager from './manager.js'

const app = express();
const port = 80;
import bodyParser from 'body-parser';
app.use(bodyParser.json()); cv


app.get('/', (req, res) => {
  res.send('Welcome to the express.js backend for Craclk');
});
app.get('/dbConnected',async(req,res)=>{
  try{
    let connected = await manager.waitUntilConnected()
    res.json({data:connected})
  }catch(err){
    console.warn(err)
    res.json({data:false})
  }
})
manager.test()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});