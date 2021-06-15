import axios from "axios";

export const baseUrl="https://localhost:44355/api/"

export default{
    cars(url=baseUrl+'Cars/'){
        return{
            fetchAll:()=>axios.get(url),
            fetchById:id=>axios.get(url+id),
            create:newRecord=>axios.post(url,newRecord),
            update:(id, updateRecord)=>axios.put(url+id,updateRecord),
            delete:id=>axios.delete(url+id)
        }
    },
    clients(url=baseUrl+'Clients/'){
        return{
            fetchAll:()=>axios.get(url),
            fetchById:id=>axios.get(url+id),
            create:newRecord=>axios.post(url,newRecord),
            update:(id, updateRecord)=>axios.put(url+id,updateRecord),
            delete:id=>axios.delete(url+id)
        }
    },
    borrows(url=baseUrl+'Borrows/'){
        return{
            fetchAll:()=>axios.get(url),
            fetchById:id=>axios.get(url+id),
            create:newRecord=>axios.post(url,newRecord),
            update:(id, updateRecord)=>axios.put(url+id,updateRecord),
            delete:id=>axios.delete(url+id)
        }
    }
}