import { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext()

export const WatchListContextProvider = (props) =>{
    const [watchList, setWatchList] = useState(
        localStorage.getItem("watchList")?.split(",") ||
        ["GOOGL", "MSFT", "AMZN"]
        )

        //localStorage.getItem("watchList")?.split(",") ||

    useEffect(() =>{
        localStorage.setItem("watchList", watchList)
    }, [watchList])

    const addStock =(stock) =>{
        if(watchList.indexOf(stock) === -1){
            setWatchList([...watchList, stock]) //...watchList is keeping/adding the current stock
        }
    }

    const deleteStock = (stock) =>{
        setWatchList(watchList.filter((el) => {
            return el!== stock //if not match keep, if match delete
        }))
    }

    return(
        <WatchListContext.Provider value={{watchList, addStock, deleteStock}}>
            {props.children}
        </WatchListContext.Provider>
    )
}
