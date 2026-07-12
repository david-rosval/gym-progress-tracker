import type { FC } from "react";

const processData = (data: unknown) => {
  console.log(data);
  return data;
};

const double = (x) => x * 2;

export default processData;
