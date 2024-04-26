"use client"

import getCompanyData  from "../api/getCompanyData";
import { useEffect, useState } from "react";
import { DataTable } from "../components/ShadCN/data-table";
import { columns } from "../components/ShadCN/columns";
import Cards from "./Cards";

const Tables = () => {
    const [companyData, setCompanyData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
  
    const getData = async () => {
      setLoading(true);

      const data = await getCompanyData();
      setCompanyData(data);

      if(data === null) 
        setError("Error fetching data")

      setLoading(false);
    };


    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    }
  
    useEffect(() => {
      getData();

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }, []);

    return (
      <>
        {
          loading ? <p>Loading...</p> : 
          error ? <p>{error}</p> : 
          isMobile ? <Cards data={companyData}/>:
          <div className="flex h-full w-full items-center justify-center flex-col bg-white">
              <DataTable columns={columns} data={companyData} />
          </div>
        }        
      </>
    );
}

export default Tables;