// "start": "react-scripts --openssl-legacy-provider start",
// https://react-bootstrap.github.io/components/alerts/ 
// import "bootswatch/dist/[theme]/bootstrap.min.css"; -- Theme: spacelab -- is linked in index.html!!

//----------------------------------------------------------
import React, { useState, useEffect } from "react";

import LoadClient from "./components/loadclient"
import DefModule, {OtherModule} from "./components/comp1.js"

import "./styles.css";


export default function App() {

  //initialize
  const hitsPerPg = "hitsPerPage=10";
  const page = 1;  // >=1 !!
  const [clientData, setClientData] = useState(["Await Data..."]);
                                                                            // eslint-disable-next-line
  const [searchQry, setsearchQry] = useState("");
  let clientUrl = `https://hn.algolia.com/api/v1/search?query=${searchQry}&tags=story`


  useEffect(() => {
    document.title = "React App: "+process.env.REACT_APP_PROJECT_NAME;
    LoadClient(clientUrl, page, hitsPerPg,setClientData);
  }, [clientUrl]);
  console.log("data in App",clientData);

  return (
    <div className="App" >    
      {(clientData === undefined) ? 
        <div>... this is my REACT boilerplate ...</div>
      : (clientData) ?
          <ul>
            {clientData.map(post=> 
            <li key={post.objectID}>{post.title}<br></br><small><i>by {post.author}</i></small></li>
            )}
          </ul>
        : <div>No Search Results</div>
      }
    </div>
   );
}
