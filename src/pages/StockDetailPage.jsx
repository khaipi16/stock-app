import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import finnHub from "../apis/finnHub";
import { StockChart } from "../components/StockChart";
import { StockData } from "../components/StockData";

export const StockDetailPage = () =>{
    const [chartData, setChartData] = useState()
    const {symbol} = useParams()
    const formatData =(data) =>{
        return data.t.map((el, index) =>{
            return{
                x: el*1000,
                y: Math.floor(data.c[index]*100)/100 //truncating decimals

            }
        })
    }
    useEffect(() =>{
        const fetchData = async () =>{
            const date = new Date()
            const currTime = Math.floor(date.getTime()/1000) //converting from ms to secs 
            let oneDay;
            if(date.getDay() === 6){
                oneDay = currTime - (2*24*60*60)
            }
            else if(date.getDay() === 0){
                oneDay = currTime - (3*24*60*60)
            }
            else{
                oneDay = currTime - (24*60*60)
            }

            const oneWeek = currTime - (7*24*60*60)
            const oneYear = currTime - (365*24*60*60)
            try{
                const responses = await Promise.all([finnHub.get("/stock/candle",{
                    params:{
                        symbol,
                        from: oneDay,
                        to: currTime,
                        resolution: 30
                    }
                }),
                finnHub.get("/stock/candle",{
                    params:{
                        symbol,
                        from: oneWeek,
                        to: currTime,
                        resolution: 60
                    }
                }), 
                finnHub.get("/stock/candle",{
                    params:{
                        symbol,
                        from: oneYear,
                        to: currTime,
                        resolution: "W"
                    }
                })])
                setChartData({
                    day: formatData(responses[0].data),
                    week: formatData(responses[1].data),
                    year: formatData(responses[2].data)
                })
                console.log(responses)
            }catch(err){
                console.log(err)
            }
        }

    



        fetchData()
    }, [symbol])

    return(
        <div>
            {chartData && ( //if chartData is not null then render the StockChart, else render nothing
                <div>
                    <StockChart 
                    chartData={chartData} 
                    symbol ={symbol}/>
                    <StockData symbol={symbol} />
                </div>
            )}
        </div>
    )
}

const chartData = {
    day: "data for a day",
    week: "data for a week",
    year: "data for a year"
}


