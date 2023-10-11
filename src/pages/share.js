import { useAtom } from "jotai";
import React, {useState, useEffect } from "react";
import { HEADER, SharePrivacy, SIDEBAR } from "../atoms";
import { useGetShare } from "../queries/mutation";
import { useLocation } from 'react-router-dom';
import CustomGridLayout from "../Dashboard/CustomDashboard/customGridLayout";

export default function Share() {
  const [sideBar, setSideBar] = useAtom(SIDEBAR);
  const [header, setHeader] = useAtom(HEADER);
  const [shareData, setSharData] = useState({})
  const [privacy,setPrivacy] = useAtom(SharePrivacy)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const id = searchParams.get('id');
  // const privacy = searchParams.get('privacy');
  // console.log(id, privacy, "id")
  
  const mutateShareData = useGetShare({
    onSuccess: (data) => {
      console.log("shareDAta", data)
      setPrivacy(data?.type)
         setSharData( data?.config?.view)
    },
    onError: (e) => {
      console.log(e);
    },
  });

  let SetConfig = () => {
    setSideBar(false);
    setHeader(false);    
    mutateShareData.mutateAsync(id);
  };
  useEffect(() => {
    SetConfig();
  }, []);
    return (
      <div className="h-80% ">      
        {shareData ? <CustomGridLayout share={true} layout={shareData} />:<div className="border mt-[1vh]  h-[99vh] text-semibold bg-[#212124ab]  text-[#B7B7B7] border-[#27272C] w-[98vw] rounded-2xl flex items-center justify-center">Log in to Access the Private Dashboard</div>}
      </div>
    );
}
