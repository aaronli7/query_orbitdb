import React from 'react'
import { useQuery } from 'react-query'

import UserTable from '../components/UserTable'
import axios from 'axios'

function AgeQuery() {
  const fetchAllUsers = async () =>
    await (await fetch('http://localhost:5000/queryAge')).json()

  const { data, error, status } = useQuery('users', fetchAllUsers)

  const orbitInit = async () =>{
    const response = await axios.get('http://localhost:5000/helloworld')
    console.log(response.data.message)
    // console.log('mission complete')
  }

  return (
    <div>
      <h2 className="mb-4">Basic Query Example</h2>
      <div className="flex items-center justify-between mb-4">
        <button className="px-4 py-1 font-semibold text-teal-900 border-2 border-teal-700 rounded hover:border-none hover:bg-teal-800 hover:text-white" onClick = {orbitInit}>orbitDBs Init</button><br/>
      </div>
      <div>
        {status === 'error' && <div>{error.message}</div>}

        {status === 'loading' && <div>Loading...</div>}

        {status === 'success' && <UserTable users={data} />}
      </div>
    </div>
  )
}

export default AgeQuery
