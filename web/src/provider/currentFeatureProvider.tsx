import { createContext, useState } from "react";
import { FeatureEnum } from "../types";

interface CurrentFeatureContextValue {
  feature: FeatureEnum;
  setFeature: (feature: FeatureEnum) => void;
}
export const currentFeatureContext = createContext<CurrentFeatureContextValue>(
  {} as CurrentFeatureContextValue
);

export const CurrentFeatureProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [feature, setFeature] = useState<FeatureEnum>(FeatureEnum.Undefined);
  return (
    <currentFeatureContext.Provider value={{ feature, setFeature }}>
      {children}
    </currentFeatureContext.Provider>
  );
};
