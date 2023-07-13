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
                  let chainId = await ethereum.request({method:"eth_chainId"})
                  const hardHatChainId = "0xaa36a7";
                  if (window.ethereum) {
                      try {
                          // Switch the network to Sophia Testnet
                          await window.ethereum.request({
                          method: 'wallet_switchEthereumChain',
                          params: [{ chainId: hardHatChainId }], // 0x2a is the hexadecimal chain ID for Sophia Testnet
                          });
                      } catch (error) {
                          console.log('Failed to switch network:', error);
                      }
                  }
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
