import { useState } from "react";
import {ethers} from 'ethers'

const Buy = (state) =>{
    const[name,setName] = useState("");
    const [message,setMessage] = useState("");
    const [price,setPrice] = useState(0.0);


    const buyChai = async (event)=>{
        event.preventDefault();
        const {contract} = state.state;        
        const eths = {value:ethers.utils.parseEther(price.toString())}
        const transaction = await contract.buyChai(name,message,eths);
        await transaction.wait();
        console.log("Transaction success")
        
    }

    return (
        <>
            <form onSubmit={buyChai}>
                <label>Enter Name</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name" placeholder="Enter your name"></input>

                <label>Enter Message</label>
                <input value={message}  onChange={(e)=>setMessage(e.target.value)} type="text" id="message" placeholder="Enter your message"></input>

                <label>Enter amount</label>
                <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" id="amount" placeholder="Enter amount"></input>

                <button type="submit">Pay</button>
            </form>
        </>
    )
}
export default Buy