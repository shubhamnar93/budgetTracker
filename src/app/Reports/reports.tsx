import { Suspense } from "react";
import { ViewType } from "./viewType";
import { Controls } from "./controls";

export const Reports = () => {
  return (
    <Suspense>
      <Controls />
      <ViewType />
    </Suspense>
  );
};
