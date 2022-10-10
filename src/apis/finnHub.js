import axios from "axios";

const TOKEN = "cc26pu2ad3icrd10orqg"

//cd235g2ad3i7m6cah36gcd235g2ad3i7m6cah370
//cc26pu2ad3icrd10orqg
export default axios.create({
    baseURL:"https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})