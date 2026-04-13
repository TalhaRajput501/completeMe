import { ApiResponse } from "../../types/ApiResponse"


export async function getRequest<T>(url:string) {

  const res = await fetch(url)
  const data : ApiResponse<T> = await res.json()

  if(!data.success || !data.data){
    throw new Error(data.error || `Failed fetching: ${url}`)
  }

  return data.data

}