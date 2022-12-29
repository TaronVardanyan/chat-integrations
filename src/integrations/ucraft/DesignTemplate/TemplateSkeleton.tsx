import React from "react";
import ImageSkeleton from "../../../../../Image/Skeleton";
import { TemplateSkeletonBlock } from "./styles";

function TemplateSkeleton() {
  return (
    <TemplateSkeletonBlock>
      <ImageSkeleton possibleHeight="60px" possibleWidth="60px" />
      <ImageSkeleton possibleHeight="20px" possibleWidth="120px" />
    </TemplateSkeletonBlock>
  );
}

export default TemplateSkeleton;
