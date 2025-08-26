"use client";
import { useSearchParams } from "next/navigation";
import { Overview } from "./overview";
import { Categories } from "./categories";
import { Trends } from "./trends";

export const ViewType = () => {
  const searchParams = useSearchParams();
  const periodParam = searchParams.get("viewType") ?? "overview";
  return (
    <>
      {periodParam === "overview" ? (
        <Overview />
      ) : periodParam === "categories" ? (
        <Categories />
      ) : (
        <Trends />
      )}
    </>
  );
};
