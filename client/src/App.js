import {useState,useEffect} from "react"
import {ethers} from 'ethers'
import abi from "./utils/artifacts/contracts/Donation.sol/Donation.json"
import { contractAddress } from "./Constant";
import Buy from "./Components/Buy"
import Memos from "./Components/Memos"

import './App.css';

function App() {

    const [state,setState] = useState({
        privider:null,
        signer:null,
        contract:null
    });
    const [account, setAccount] = useState("None");

    useEffect(()=>{
        const connectWallet = async ()=>{

            const contractABI = abi.abi;
            try {
                const { ethereum } = window;
        
                if (ethereum) {
                  const account = await ethereum.request({
                    method: "eth_requestAccounts",
                  });
        
                  window.ethereum.on("chainChanged", () => {
                    window.location.reload();
                  });
        
                  window.ethereum.on("accountsChanged", () => {
                    window.location.reload();
                  });
        
                  const provider = new ethers.providers.Web3Provider(ethereum);
                  const signer = provider.getSigner();
                  const contract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                  );
                  setAccount(account);
                  setState({ provider, signer, contract });
                } else {
                  alert("Please install metamask");
                }
              } catch (error) {
                console.log(error);
              }
        };
        connectWallet()
    },[])


    return (
        <div className="App">
            <Buy state={state}></Buy>
            <Memos state={state}></Memos>
        </div>
    );
}

export default App;
