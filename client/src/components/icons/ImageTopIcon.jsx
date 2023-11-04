import React from "react";
import { EyeIcon, CloudArrowDownIcon } from "@heroicons/react/24/solid";

export const ViewIcon = ({  width, height }) => {
  return (
    <EyeIcon
      className={`px-1 py-1 w-${width} h-${height} text-black  bg-slate-300 rounded-full hover:text-gray-700`}
    />
  );
};

export const DownloadIcon = ({  width, height }) => {
  return (
    <CloudArrowDownIcon
      className={`px-1 py-1 w-${width} h-${height} text-black  bg-slate-300 rounded-full hover:text-gray-700`}
    />
  );
};

