import React from "react";
import "./Skeleton.css";

const SkeletonLoad = () => {
  return (
    <div className="skeleton-card relative text-center p-[10px] mt-[16px] bg-[var(--card-color)] rounded-[5px] cursor-pointer border-[2px] border-solid border-[var(--border-color)]">
      <div className="skeleton-img w-[150px] h-[220px] ml-[auto] mr-[auto] bg-gray-300"></div>
      <div className="skeleton-text mt-[20px] mb-[12px] w-[60%] h-[20px] bg-gray-300 mx-auto"></div>
      <div className="skeleton-text w-[40%] h-[20px] bg-gray-300 mx-auto"></div>
      <div className="skeleton-text w-[50%] h-[20px] bg-gray-300 mx-auto mt-[8px]"></div>
      <div className="skeleton-text w-[30%] h-[20px] bg-gray-300 mx-auto mt-[8px] mb-[15px]"></div>
    </div>
  );
};

export default SkeletonLoad;
