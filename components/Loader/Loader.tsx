"use client";

import React from "react";
import styles from "./Loader.module.css";

export default function Loader({
  size = 64,
  label = "Loading",
}: {
  size?: number;
  label?: string;
}) {
  const style: React.CSSProperties = {
    width: size,
    height: size,
  };

  return (
    <div className="items-center min-h-screen" style={{ display: "flex", justifyContent: "center" }}>
      <div className={styles.wrapper} role="status" aria-live="polite" aria-label={label}>
        <div className={styles.spinner} style={style} />
        <span className={styles.visuallyHidden}>{label}…</span>
      </div>
    </div>
  );
}
