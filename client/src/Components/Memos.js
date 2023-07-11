import { useEffect, useState } from "react";
import {ethers} from 'ethers'

const Memos = (state) =>{

    const[list,setList] = useState([]);
    const[processing,setProcessing] = useState(false)
    const {contract} = state.state;

    const getMemos = async ()=>{
        try{
            setProcessing(true)
            const transaction = await contract.getMemos();
            setList(transaction)
        }catch(e){
            console.log(e)
        }
        setProcessing(false)
    }
    useEffect(()=>{
        getMemos()
    },[contract])
    return(
        <>
            <div className="bg-memos">
                <div className="container py-3">

                    <div className="d-flex flex-wrap rounded my-3 py-3">
                        <button className="btn btn-success px-4" onClick={getMemos}>
                            {(processing)?<><span className="spinner-border p-2 spinner-border-sm mx-2" role="status" aria-hidden="true"></span></>:<></>}
                            Refresh
                        </button>
                    </div>
                    <div class="table-responsive-sm">
                        <table class="table table-borderless">
                            <thead class="table-opacity-75">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Message</th>
                                    <th scope="col">Address</th>
                                </tr>
                            </thead>
                            <tbody>
                        {list.map((d)=>{
                            return (<>
                                <tr>
                                    <td>{d?.name}</td>
                                    <td>{d?.message}</td>
                                    <td className="mx-3 text-start">{d?.from}</td>
                                </tr>
                            </>)
                        })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Memos