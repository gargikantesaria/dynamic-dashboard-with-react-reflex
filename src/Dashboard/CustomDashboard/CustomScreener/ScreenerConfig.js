import { useAtom } from 'jotai';
import React,{useEffect,useState} from 'react'
import { useScreenerQuery } from '../../../queries/mutation';
import ScreenerTable from "../../LayoutComponents/ScreenerTable"
import Table from '../../ReusableComponents/Table';

function ScreenerConfig({ query }) {
  const [queryResult, setQueryResult] = useState([]);
  const [column,setColumn]= useState([])
    const mutateScreenerQuery = useScreenerQuery({
      onSuccess: (data) => {
        const defaultColumns = data.tokens.length==0 ? [] : Object.keys(data.tokens[0]).map((col_name,i)=>{
          return {accessorKey:col_name, header:col_name}
        })
          setColumn(defaultColumns)
          setQueryResult(data.tokens);
        },
        onError: (e) => {
          console.log("error",e);
          setQueryResult([]);
        },
      });
  let fetchByConfig = () => { 
    mutateScreenerQuery.mutateAsync( { config: query })
    }
    useEffect(() => {
      fetchByConfig() 
    }, []);

  return <Table data={queryResult} columns={column} screenerTable={true} />
}

export default ScreenerConfig