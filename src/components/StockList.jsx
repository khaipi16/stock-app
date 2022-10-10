import {useState, useEffect, useContext} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs'
import finnHub from '../apis/finnHub';
import { WatchListContext } from '../context/watchListContext';

export const StockList = () =>{
    const [stock, setStock] = useState([]) //if ERROR:Cannot read 
    //properties of undefined (reading 'map') usually means use an empty array for useState
    const {watchList, deleteStock} = useContext(WatchListContext)
    const navigate = useNavigate()

    const changeColor = (change) =>{
        return(
            change > 0 ? 'success':'danger'
        )
    }

    const renderIcon = (stockValue) =>{
        return(
            stockValue < 0 ? <BsFillCaretDownFill/>:<BsFillCaretUpFill/>
        )
    }

    useEffect(() => {
        let isMounted = true

        const fetchData = async () =>{
            try{
                //this is the same as 
                //finnHub.get("/quote?symbol=MSFT&token=cc26pu2ad3icrd10orqg")
                const responses = await Promise.all(watchList.map((stock) =>{
                    return finnHub.get("/quote", {
                        params:{
                            symbol: stock
                        }
                    })
                }))
                const data = responses.map((response) =>{
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
              
                })
                // console.log(data)
                if(isMounted){
                    setStock(data) //only want data bc the response contains header, request, status..etc. 
                }
            }catch(e){

            }
        }
        fetchData()
        return () => (isMounted = false) 
        //if component gets unmounted when we get a response, will skip over unmounted component
    }, [watchList]) 
    //dependency array will run every time 
    // the component render, we only want it to fetch data when the component mounts

    const handleStockSelect = (symbol) =>{
        navigate(`detail/${symbol}`)
    }


    return(
        <div >
            <table className="table hover mt-5">
                <thead style={{color: "rgb(79,89, 102)"}}>
                    <tr>
                        <th scope = "col">Name</th>
                        <th scope = "col">Last</th>
                        <th scope = "col">Chg</th>
                        <th scope = "col">Chg%</th>
                        <th scope = "col">High</th>
                        <th scope = "col">Low</th>
                        <th scope = "col">Open</th>
                        <th scope = "col">Pclose</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.map((stockData) =>{
                        return(
                            <tr onClick={() => handleStockSelect(stockData.symbol)} 
                            style = {{cursor:"pointer"}}className="table-row" key={stockData.symbol}>
                                <th scope="row">{stockData.symbol}</th>
                                <td>{stockData.data.c}</td> 
                                <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d>0?"+"+stockData.data.d:stockData.data.d}{renderIcon(stockData.data.d)}</td>
                                <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp>0?"+"+stockData.data.dp:stockData.data.dp}{renderIcon(stockData.data.dp)}</td>
                                <td>{stockData.data.h}</td>
                                <td>{stockData.data.l}</td>
                                <td>{stockData.data.o}</td>
                                <td>{stockData.data.pc} <button className="btn btn-sm ml-3 btn-danger d-inline-block delete-button"
                                onClick={(e) =>{
                                e.stopPropagation()
                                deleteStock(stockData.symbol)}}>Remove</button></td>
                                {/* <td>{stockData.data.t}</td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
};