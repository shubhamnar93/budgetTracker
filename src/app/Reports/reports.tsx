import { Suspense } from "react";
import { Overview } from "./overview";

export const Reports = () => {
  return (
    <Suspense>
      <Overview />
    </Suspense>
  );
};
