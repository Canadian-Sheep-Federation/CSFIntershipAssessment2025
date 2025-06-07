import React, { useState } from 'react'
import './Results.css';

export const Results = () => {
    const [userID, setUserID] = useState("");
    const [returned, setReturned] = useState([]);

    const handleInput = (event) => {
        setUserID(event.target.value);
    }

    // retrieve the entry for the specified userid, if empty return every entry in the database
    const handleGo = () => {
        if (userID === "")
            getAllEntries();
        else
            getEntry(userID);
    }

    // retrieve the database entry for the specified userid
    async function getEntry(userID) {
        try {
            const response = await fetch(`http://localhost:4000/getentry/${userID}`);
            if (!response.ok) {
                console.log(response.status);
            } else {
                const data = await response.json();
                // if data is null, set returned to an empty list instead, otherwise set returned to data.row if a row is returned
                data === null ? setReturned([]) : setReturned([data.row]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // retrieve all database entries
    async function getAllEntries() {
        try {
            const response = await fetch('http://localhost:4000/getallentries');
            if (!response.ok) {
                console.log(response.status);
            } else {
                const data = await response.json();
                // if data.rows is null, set returned to an empty list instead
                setReturned(data.rows || []);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // delete all database entries
    async function clear() {
        try {
            const response = await fetch('http://localhost:4000/clear', {
                method: 'DELETE'
            });
            if (!response.ok) {
            } else {
                // returns an empty list and refreshes the page to display "no results in database" after pressing clear
                await getAllEntries();
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="results">
        <div className="fields">
            <label htmlFor="return-data">Enter Username: </label>
            <input type="text" id="return-data" placeholder="Optional" onChange={handleInput}/>
            <button className="go" onClick={handleGo}>GO!</button>
            <button className="clear" onClick={() => clear()}>Clear Database</button>
        </div>
        <div className="all-returned">
            {/* for each returned database entry, print all four values on their own line
                if no database entries are returned, print instead "no results in database" */}
            {returned.length > 0 ? returned.map((item, index) => (
                <div key={index} className="returned-entry">
                    <li>{item.userid}</li>
                    <li>{item.region}</li>
                    <li>{item.pokemon}</li>
                    <li>{item.type}</li>
                </div>
            ))
            : <p style={{textAlign: "center"}}>No results in database</p>}
        </div>
    </div>
  )
}
