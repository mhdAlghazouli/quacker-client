import { useState, useEffect } from "react";

const useFollowFetch = () => {

  const [followSectionData, setFollowSectionData] = useState([]);

  // get followed fetch
  async function handleGetFollow() {
    console.log("useFollow fetch")
    const response = await fetch("https://quacker-api.onrender.com/follows", {
      method: "GET",
    });
    const followRes = await response.json();
    setFollowSectionData(followRes)
  }

  useEffect(() => {
    handleGetFollow()
   }, [])
   return { followSectionData }
}

export default useFollowFetch