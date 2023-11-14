import axios from 'axios'

export default axios.create({})
export const axiosPrivate = axios.create({
    method: "GET",
	headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
	}
})