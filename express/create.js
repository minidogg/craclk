import * as mongoose from 'mongoose'
import { Message, Channel, Server, User } from './schema.js'
import {hashString} from './hash.js'
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

let craclkAcc = "e";
async function getCraclkAcc(){
    if(craclkAcc!=="e")return craclkAcc
    await createUser("Craclk","-","",true,true)
    craclkAcc = await User.findOne({username:"Craclk"})
    return craclkAcc
}
getCraclkAcc()
let craclkServer = "e";
async function getCraclkServer(){
    if(craclkServer!=="e")return craclkServer
    await createServer("Craclk")
    craclkServer = await Server.findOne({username:"Craclk"})
    return craclkServer
}
getCraclkServer()

export async function createUser(username="xyz",password="abcd",email="somewhere@there.com",ignoreRestrictions=false,locked=false){
    if(await User.findOne({ username: username })!=null){
        return {error:"Account already exists"}
    }
    if(ignoreRestrictions==false){
        if(/[^\w]/g.test(username)){
            return {error:"Invalid username"}
        }
        if(username.length<=3||username.length>42){
            return {error:"Invalid username length (Length must be between 3 and 42.0)"}
        }
        if(password.length<8||password.length>100){
            return {error:"Invalid password length (Length must be between 8 and 100)"}
        }
        if(!(/[a-z]/g.test(password)||/[A-Z]/g.test(password)||/\W/g.test(password))){
            return {error:"Invalid password (Requires at least one lower case, one upper case, one number)"}
        }
    }

    let acc = await new User({
        username:username,
        password:hashString(password),
        email:(typeof(email)=="undefined"?"none":email),
        locked:locked
    }).save()    
    await Server.findByIdAndUpdate(await getCraclkServer().ObjectId, {
        $push: { members:acc } },
        { new: true }
    )

    return acc
}

export async function createServer(name,owner,ignoreRestrictions=false){
    if(ignoreRestrictions==false){
        if(name.length>=96){
            return {error:"Server name is too long! (Max is 96 characters)"}
        }
    }
    if(await Server.findOne({ name: name })!=null){
        return {error:"Server already exists"}
    }
    let message = await createMessage(await getCraclkAcc(),"First!@@!!@!@!@")
    let general = await createChannel("general")
    general.messages.push(message)
    let server = new Server({
        name:name,
        channels:[general],
        owner:owner,
        invite:genRanHex(8)
    })
    server = await server.save()


    return server
}

export async function createChannel(name,ignoreRestrictions=false){
    if(ignoreRestrictions==false){
        if(name.length>=69){
            return {error:"Channel name is too long! (Max is 50 characters)"} //dont change 50 to 69, its a funny
        }
    }

    let channel = await new Channel({
        name:name,
        messages:[]
    }).save()

    return channel
}

export async function createMessage(user,content,ignoreRestrictions=false){
    if(ignoreRestrictions==false){
        if(content.length>=420){
            return {error:"Message is too long! (Max is 420 characters)"}
        }
    }

    let message = await new Message({
        content:content,
        sender:user
    }).save()

    return message
}