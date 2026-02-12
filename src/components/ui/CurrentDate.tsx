"use client";

export default function CurrentDate() {
  return (
    <span suppressHydrationWarning>
      {new Date().toLocaleDateString("en-GB")}
    </span>
  );
}
