import React from 'react'
import { useQuery } from 'react-query'

import UserTable from '../components/UserTable'
import axios from 'axios'

function AgeQuery(props) {

  const fetchAllUsers = async () => {

      const q_result =  (await axios.post('http://localhost:5000/queryAge', {age:props.age}))
      return q_result.data
      
  }


  const { data, error, status } = useQuery('users', fetchAllUsers)

  return (
    <div>
      <h2 className="mb-4">Basic Query Example</h2>
      <div>
        {status === 'error' && <div>{error.message}</div>}

        {status === 'loading' && <div>Loading...</div>}

        {status === 'success' && <UserTable users={data} />}
      </div>
    </div>
  )
}

export default AgeQuery
