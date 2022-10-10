import { StockList } from "../components/StockList";
import { SearchStock } from "../components/SearchStocks";
import trading from "../trading.png";


export const StockOverViewPage = () =>{
    return(
        <div>
            <div className="text-center">
                <img src ={trading} />
            </div>
            <h3 className = "text-center" style={{color:"green"}}>Welcome to Stock App</h3>
            <SearchStock/>
            <StockList/>
        </div>
    )
};