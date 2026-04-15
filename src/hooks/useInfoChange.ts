import { postDto } from "@/app/api/user/route";
import { postRequest } from "@/utils/postRequest";
import { useEffect, useState } from "react";

export function useInfoChange({creds}: {creds: postDto}){

  const [data, setData] = useState<unknown>()


  useEffect(() => {
    async function infoChange() {
      
      const response = await postRequest<postDto>({
        url: '/api/user',
        data: creds
      })

      setData(response)
    }
    infoChange()
  }, [])

  return {data}
}