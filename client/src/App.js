import {useState,useEffect} from "react"
import {ethers} from 'ethers'
import abi from "./utils/artifacts/contracts/Donation.sol/Donation.json"
import { contract } from "./Constant";

import './App.css';

function App() {

    const [state,setState] = useState({
        privider:null,
        signer:null,
        contract:null
    });

    useEffect(()=>{
        const connectWallet = async ()=>{

            try{
                const{ethereum} = window;
                if(ethereum){
                    const account = await ethereum.request({method:"eth_requestAccounts"})
                }
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contracts = new ethers.Contract(contract,abi.abi,signer);
                setState({provider,signer,contracts})
            }catch(e){
                console.log(e)
            }
        }
        connectWallet()
    },[])
    console.log(state)


    return (
        <div className="App">
                Connect wallet
        </div>
    );
}

export default App;
