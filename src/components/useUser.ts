import { useContext } from "react";
import { UserContext } from "./UserContext.js";

export default function useUser(){
    const ctx = useContext(UserContext)
    if(!ctx){
        throw new Error('error in useUser')
    }
    return ctx
}