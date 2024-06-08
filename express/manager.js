import * as mongoose from 'mongoose'
import { Message, Channel, Server, User } from './schema.js'
import * as creation from './create.js'

let connected = false
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/craclk');
    connected = true
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const maxCycles = 2000/50
export async function waitUntilConnected(){
    return new Promise((resolve,reject)=>{
        if(connected==true){
            resolve(connected)
            return
        }
        let cycles = 0
        let int = setInterval(()=>{
            cycles+=1
            if(cycles>maxCycles){
                reject("Hit max cycle cap: '"+maxCycles+"' when waiting for mongoose to connecet.")
                clearInterval(int)
                return
            }
            if(connected==true){
                resolve(connected)
                clearInterval(int)
                return 
            }
        },50)
    })
}

export async function test(){
    // let d = await creation.createUser("abcd","abCD1234","")
    // let d = await creation.createServer("The Warehouse")
    // console.log(d)
}

export function getCreationJs(){
    return creation
}
