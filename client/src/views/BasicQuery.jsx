import React from 'react'
import {useState} from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import UserTable from '../components/UserTable'
import axios from 'axios'

function BasicQuery() {
  const [queryAge, setQueryAge] = useState(0)

  const fetchAllUsers = async () =>
    await (await fetch('http://localhost:5000/showPatients')).json()

  const { data, error, status } = useQuery('users', fetchAllUsers)

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The query age was: ${queryAge}`)
  }

  return (
    <div>
      <h2 className="mb-4">EHRs Query Example</h2>
      <div>
      <form onSubmit={handleSubmit}>
        <label>
          Query patients whose age older than:
          <input 
            type="number" 
            name="age" 
            onChange={(e)=>setQueryAge(e.target.value)}
          />
        </label>
        <button className="bg-teal-800 border-teal-800 shadow-md text-white btn hover:bg-gray-100 hover:border-2 hover:text-teal-900"
            type="submit"> Query </button>
      </form>
      <Link
          to="/ageOldThan"
          className="px-4 py-1 font-semibold text-teal-900 border-2 border-teal-700 rounded hover:border-none hover:bg-teal-800 hover:text-white"
        >
          Hard query
      </Link>

      </div>

      <div>
        {status === 'error' && <div>{error.message}</div>}

        {status === 'loading' && <div>Loading...</div>}

        {status === 'success' && <UserTable users={data} />}
      </div>
    </div>
  )
}

export default BasicQuery
