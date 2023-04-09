import { createContext, useCallback, useEffect, useState } from "react";
import { history } from "../App";
import { FeatureEnum } from "../types";

const FEATURE_LS_KEY = "currentFeature";
interface CurrentFeatureContextValue {
  feature: FeatureEnum;
  updateCurrentFeature: (feature: FeatureEnum) => void;
}
export const currentFeatureContext = createContext<CurrentFeatureContextValue>(
  {} as CurrentFeatureContextValue
);

export const CurrentFeatureProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [feature, setFeature] = useState<FeatureEnum>(FeatureEnum.Task);

  const updateCurrentFeature = useCallback((feature: FeatureEnum) => {
    localStorage.setItem(FEATURE_LS_KEY, feature.toString());
    setFeature(feature);
    history.push("/");
  }, []);

  useEffect(() => {
    try {
      const currentFeature = localStorage.getItem(FEATURE_LS_KEY);

      if (currentFeature) {
        setFeature(+currentFeature as FeatureEnum);
      } else {
        localStorage.setItem(FEATURE_LS_KEY, FeatureEnum.Task.toString());
        setFeature(FeatureEnum.Task);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <currentFeatureContext.Provider value={{ feature, updateCurrentFeature }}>
      {children}
    </currentFeatureContext.Provider>
  );
};
