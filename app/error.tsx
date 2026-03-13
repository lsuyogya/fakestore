"use client";
import ErrorComponent from "./_components/ErrorComponent";

const error = () => {
  return (
    <ErrorComponent errorMsg="Oops, something went wrong!"></ErrorComponent>
  );
};

export default error;
