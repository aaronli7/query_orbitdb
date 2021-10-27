import React, { useEffect }from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import UserTable from '@/components/UserTable'
import axios from 'axios'
// import getWeb3 from '@/utils/getWeb3'
// import Web3 from 'web3'
// import contract from '@truffle/contract'
// const contract = require('@truffle/contract')

function WhiteList(){

    const [blockChainHash, updateBlockChainHash] = useState(``)
    const [web3, setWeb3] = useState(``)
    const [address, updateAddress] = useState(``)
    const [imgHash, updateImgHash] = useState(``)
    const [userPK, updateUserPK] = useState(``)
    const [_storage_name, updateStorageName] = useState(``)
    const [_AreaID, updateAreaID] = useState(``)
    const [_PatientID, updatePatientID] = useState(``)
    const [_WL_requesters, updateWLRequester] = useState(``)
    const [_remove_WL_requesters, updateRemoveWLRequesters] = useState(``)
    const [_current_WL, setCurrentWL] = useState(``)
    const [isWriteSuccess, setWriteSuccess] = useState(false)

    useEffect( () => {
        console.log("I'm on fire!!!")
     }, []);

    return (
        <div>
            <h2>Update your white list</h2>
            <div className="cont_text_max">Main Contract Address:</div>
            <section className="flex flex-col field md:flex-row">
							<div>
								<label htmlFor="storageName">Storage Name</label>
								<input type="text" onChange={()=>{}} />
							</div>

							<div>
								<label htmlFor="storageName">AreaID</label>
								<input type="text" onChange={()=>{}} />
							</div>

							<div>
							<label htmlFor="storageName">PatientID</label>
								<input type="text" onChange={()=>{}} />
							</div>
            </section>
						<button
								className="bg-teal-800 border-teal-800 shadow-md text-white btn hover:bg-gray-100 hover:border-2 hover:text-teal-900"
								type="button"
								onClick={()=>{}}
          			>
            		Store EHR to SC
          	</button>

						<section className="flex flex-col field md:flex-row">
							<div>
								<label htmlFor="storageName">add address to whitelist</label>
								<input type="text" onChange={()=>{}} />
							</div>
            </section>
						
						<button
								className="bg-teal-800 border-teal-800 shadow-md text-white btn hover:bg-gray-100 hover:border-2 hover:text-teal-900"
								type="button"
								onClick={()=>{}}
          			>
            		Add address to whitelist
          	</button>

						<section className="flex flex-col field md:flex-row">
							<div>
								<label htmlFor="storageName">remove address to whitelist</label>
								<input type="text" onChange={()=>{}} />
							</div>
            </section>
						<button
								className="bg-teal-800 border-teal-800 shadow-md text-white btn hover:bg-gray-100 hover:border-2 hover:text-teal-900"
								type="button"
								onClick={()=>{}}
          			>
            		Remove address to whitelist
          	</button>

						<section className="flex flex-col field md:flex-row">
							<button
									className="bg-teal-800 border-teal-800 shadow-md text-white btn hover:bg-gray-100 hover:border-2 hover:text-teal-900"
									type="button"
									onClick={()=>{}}
									>
									Print current whitelist
							</button>
            </section>
        </div>
    )
}

export default WhiteList