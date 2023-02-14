import express from 'express';
import * as dotenv from 'dotenv'
import axios from 'axios'

const loaderInstance = express();
dotenv.config();
//  console.log(process.env)
const PORT = process.env.LOAD_BALANCE_PORT || 8000;
const servers = ['http://localhost:2000/', 'http://localhost:3000/', 'http://localhost:4000/' ];

let server_index = 0;

const proxy_handler= async (req, res)=>{
    const {header, url, query, body, method} = req;
   
     server_index ===( servers.length-1) ? server_index = 0 : server_index++

     const server = servers[server_index];
    try{
        const server_req = await axios({
            header:{header},
            method:method,
            url:`${server}${url}`,
            data:body,
            params:query
        })
        if(server_req.statusText === 'OK'){
            // server_index++; 
            res.send(server_req.data)
        }
    }catch(e){
        return proxy_handler
    }
}

// request and handler
loaderInstance.use((req, res)=>proxy_handler(req, res));

loaderInstance.listen(PORT, ()=> console.log('proxy_server listening to port '+PORT))