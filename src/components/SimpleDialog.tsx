import React from "react";

interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function SimpleDialog({ open, onClose, children }: SimpleDialogProps) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "visible"
    }}>
      <div style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        minWidth: "500px",
        maxWidth: "90vw",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        zIndex: 10000,
        overflow: "visible"
      }}>
        {children}
      </div>
    </div>
  );
}
