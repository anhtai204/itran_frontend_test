import React, { useEffect, useRef } from "react";

export function Overview({ overview }: { overview: string }) {
  return (
    <div
      className="prose prose-gray dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: overview }}
    ></div>
  );
}
