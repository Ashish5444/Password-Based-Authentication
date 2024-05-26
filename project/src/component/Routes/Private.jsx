import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import Page from '../Page';

const Private = () => {
    const [ok, setok] = useState(false);
    useEffect(() => {
      const init = async () => {
        try {
          let response = await fetch(
            "http://localhost:8080/api/v1/auth/get-session",
            {
              method: "GET"
            }
          );
  
          if (response.ok){
            response = await response.json();
            console.log(response);
            if (response.success){
              setok(true);
            }
            else {
              setok(false);
            }
          }
        } catch (err) {
          console.log(err);
        }
      };
  
     init();
    }, []);
  
  
    return <div>
      {
        (ok) ? <Outlet/> : <Page/>
      }
    </div>;
  };
  
  export default Private;
  
