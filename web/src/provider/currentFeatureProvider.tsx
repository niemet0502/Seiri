import { createContext, useCallback, useState } from "react";
import { history } from "../App";
import { FeatureEnum } from "../types";

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
    setFeature(feature);
    history.push("/");
  }, []);

  return (
    <currentFeatureContext.Provider value={{ feature, updateCurrentFeature }}>
      {children}
    </currentFeatureContext.Provider>
  );
};
