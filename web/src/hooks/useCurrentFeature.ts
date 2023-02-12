import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useCurrentFeature = () => {
  const [feature, setFeature] = useState<string>("");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.length === 1) return;
    console.log(pathname[1]);

    setFeature(pathname[1]);
  }, [pathname]);
  return { feature };
};
