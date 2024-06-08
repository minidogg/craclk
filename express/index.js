import express from 'express';
import * as manager from './manager.js'
import * as fs from 'fs'

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
if(!fs.existsSync("../token.txt"))fs.writeFileSync("../token.txt",genRanHex(32),"utf-8")

const app = express();
const port = 80;
import bodyParser from 'body-parser';
app.use(bodyParser.json());


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
const token = fs.readFileSync("../token.txt","utf-8")

//require API token because only the next.js server should have direct access to the API.
app.use((req,res,next)=>{
  if(req.path.startsWith("/api")){
    if(req.method!=="POST"){
      res.status(405)
      res.json({errror:"You must use POST when interacting with the API"})
      return
    }
    if(req.body.token!==token){
      res.status(403)
      res.json({error:"Expected token property in the JSON to equal to the correct token."})
      return
    }

  }


  next()
})
const creation = manager.getCreationJs()
const libs = {manager,creation}
app.post("/api/:lib/:function",(req,res)=>{
  if(!libs[req.params.lib]){
    res.status(400)
    res.json({error:"Invalid lib param! (Doesn't exist)"})
    return
  }
  if(!libs[req.params.lib][req.params.function]){
    res.status(400)
    res.json({error:"Invalid function param! (Doesn't exist)"})
    return
  }
  if(!req.body.args){
    res.status(400)
    res.json({error:"Args weren't provided in body!"})
    return
  }
  let data = libs[req.params.lib][req.params.function](...req.body.args)
  if(data==undefined)data = "No data was provided by the function!"
  res.json({data})
})
manager.test()


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});