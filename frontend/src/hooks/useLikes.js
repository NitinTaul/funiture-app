import { useContext } from "react"
import LikesContext from "../contexts/LikesContext"
export const useLikes = () => useContext(LikesContext)
