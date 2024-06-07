import * as mongoose from 'mongoose'
import { Message, Channel, Server, User } from './schema.js'
import {hashString} from './hash.js'

let craclkAcc = "e";
async function getCraclkAcc(){
    if(craclkAcc!=="e")return craclkAcc
    await createUser("Craclk","-","",true,true)
    craclkAcc = await User.findOne({username:"Craclk"})
    return craclkAcc
}

export async function createUser(username="xyz",password="abcd",email="somewhere@there.com",ignoreRestrictions=false,locked=false){
    if(await User.findOne({ username: username })!=null){
        return {error:"Account already exists"}
    }
    if(ignoreRestrictions==false){
        if(/[^\w]/g.test(username)){
            return {error:"Invalid username"}
        }
        if(username.length<=3||username.length>25){
            return {error:"Invalid username length"}
        }
        if(password.length<8||password.length>100){
            return {error:"Invalid password length"}
        }
        if(!(/[a-z]/g.test(password)||/[A-Z]/g.test(password)||/\W/g.test(password))){
            return {error:"Invalid password"}
        }
    }

    let acc = await new User({
        username:username,
        password:hashString(password),
        email:(typeof(email)=="undefined"?"none":email),
        locked:locked
    }).save()    

    return acc
}

export async function createServer(name,ignoreRestrictions=false){
    if(ignoreRestrictions==false){
        if(name.length>=100){
            return {error:"Server name is too long! (Max is 100 characters)"}
        }
    }
    if(await Server.findOne({ name: name })!=null){
        return {error:"Server already exists"}
    }
    let message = await createMessage(await getCraclkAcc(),"First!@@!!@!@!@")
    let general = await createChannel("general")
    general.messages.push(message)
    let server = await new Server({
        name:name,
        channels:[general]
    }).save()

    return server
}

export async function createChannel(name,ignoreRestrictions=false){
    if(ignoreRestrictions==false){
        if(name.length>=100){
            return {error:"Channel name is too long! (Max is 100 characters)"}
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