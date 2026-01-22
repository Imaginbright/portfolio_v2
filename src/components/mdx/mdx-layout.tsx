import React from "react";

export default function MDXLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="px-5 md:px-0 max-w-4xl mx-auto prose prose-invert">
        {children}
      </div>
    </div>
  );
}
