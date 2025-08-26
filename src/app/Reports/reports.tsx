import { Suspense } from "react";
import { ViewType } from "./viewType";

export const Reports = () => {
  return (
    <Suspense>
      <ViewType />
    </Suspense>
  );
};
