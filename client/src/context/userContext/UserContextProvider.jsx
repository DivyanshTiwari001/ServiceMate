import React,{useEffect} from "react";
import UserContext from "./UserContext";
import { getClientInfo } from '../../../utils/client.utils';
import { getProfInfo } from '../../../utils/professional.utils';


const UserContextProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    useEffect(()=>{
        const fetchUser = async()=>{
          try{
            let userInfo = null;
            if(!user){
              try{
                userInfo = await getProfInfo();
              }catch(err){/* dummy try catch if user is not a prof server will throw err but we need to try for client so this is to handle that err */}
              if(!userInfo)userInfo = await getClientInfo();
              setUser(userInfo.data)
            }
          }catch(error){
          }
        }
        fetchUser();
      },[])
    return (
    <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
    )
}

export default UserContextProvider;