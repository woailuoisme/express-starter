import axios from "axios"

exports.instance=(auth = true)=>
{
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
  if (process.env.token) headers.Authorization = `Bearer ${process.env.token}`

  return axios.create({
    baseURL: process.env.baseURL,
    crossDomain: true,
    withCredentials: false,
    headers: headers,
    timeout: 50000,
  })
}

