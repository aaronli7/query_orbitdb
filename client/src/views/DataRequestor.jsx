import React, { useState } from 'react'
import { useQuery } from 'react-query'

function DataRequestor(){
    
    return(
        <div>
            <h2>Please query the data by providing the wallet address of the entity</h2>
            <div className="cont_text_max">Main Contract Address:</div>
            <section className="flex flex-col field md:flex-row">
							<div>
								<label htmlFor="patientAddress">Patient Address</label>
								<input type="text" onChange={()=>{}} />
							</div>
            </section>
						<button
								className="bg-teal-800 border-teal-800 shadow-md text-white btn hover:bg-gray-100 hover:border-2 hover:text-teal-900"
								type="button"
								onClick={()=>{}}
          			>
            		Retrieve
          	</button>

						<section className="flex flex-col field md:flex-row">
							<button
									className="bg-teal-800 border-teal-800 shadow-md text-white btn hover:bg-gray-100 hover:border-2 hover:text-teal-900"
									type="button"
									onClick={()=>{}}
									>
									Print access list
							</button>
            </section>
        </div>
    )
}

export default DataRequestor