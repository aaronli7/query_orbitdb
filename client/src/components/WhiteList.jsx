import React from 'react'
import {useState} from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import UserTable from '../components/UserTable'
import axios from 'axios'

function WhiteList(){
    return (
        <h2> Update the white list</h2>
    )
}

export default WhiteList