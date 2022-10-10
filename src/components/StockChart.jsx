import Chart from 'react-apexcharts'
import {useState} from 'react'

export const StockChart = ({chartData, symbol}) =>{
    const [selectDate, setSelectedDate] = useState("24h ")
    const {day, week, year} = chartData
    const determineSelectDate = () =>{
        switch(selectDate){
            case "24h":
                return day
            case "7d":
                return week
            case "1yr":
                return year
            default:
                return day
        }
    }
    const color = determineSelectDate()
    [determineSelectDate().length-1].y - determineSelectDate()[0].y > 0? "#26C281":"#ED3419"

    const options = {
        colors: [color],
        title: {
            text: symbol,
            align: "center",
            style:{fontSize: "24px"}
        },
        chart:{
            id: "stock data",
            animations:{
                speed: 1300
            }
        },
        xaxis:{
            type: "datetime",
            labels:{
                datetimeUTC: false
            }
        },
        tooltip: {
            x:{
                format: "[HH:MM] MMM dd, yyyy"
            }
        }
    }
    
 

    const series = [{
        name: symbol,
        data: determineSelectDate()
    }]

    const renderButtonSelect = (button) =>{
        const classes = "btn m-1 "
        if(button === selectDate){
            return classes + "btn-primary"
        }
        else{
            return classes + "btn-outline-primary"
        }
    }

    return(
        <div className="mt-5 p-4 shadow-sm bg-white">
            <Chart options={options}
            series = {series}
            type = "area"
            width = "100%" />
            <div>
                <button className={renderButtonSelect("24h")} onClick={() =>{setSelectedDate("24h")}}>24h</button>
                <button className={renderButtonSelect("7d")} onClick={() =>{setSelectedDate("7d")}}>7d</button>
                <button className={renderButtonSelect("1yr")} onClick={() =>{setSelectedDate("1yr")}}>1yr</button>
            </div>
        </div>
    )
}