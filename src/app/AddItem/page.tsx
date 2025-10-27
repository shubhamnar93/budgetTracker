"use client";
import React, { Suspense } from "react";
import { AddItemForm } from "./AddItemForm";

const AddItemPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddItemForm />
    </Suspense>
  );
};

export default AddItemPage;
