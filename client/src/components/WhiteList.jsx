import React, { useEffect }from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import UserTable from '@/components/UserTable'
import axios from 'axios'
// import getWeb3 from '@/utils/getWeb3'
// import Web3 from 'web3'


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
        <h2> White list</h2>
        
    )
}

export default WhiteList