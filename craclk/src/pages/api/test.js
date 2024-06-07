import * as process from 'process'
const testToken = process.env["TEST_TOKEN"]


import { NextApiRequest, NextApiResponse } from 'next'
/** 
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
*/
export default async function handler(req,res){
    if(req.query["token"]!==testToken){
        res.status(403).json({"error":"Invalid testing token!"})
        return
    }

    res.status(503).json({"error":"Finished API handler, but got no response."})
}