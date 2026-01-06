import React from "react";

export default function Loader({ size, color }) {
    return (
        <div
            className="animate-spin rounded-full border-4 border-t-transparent flex justify-center w-[100vh]"
            style={{
                width: size || 30,
                height: size || 30,
                borderColor: color || "#6366f1",
                borderTopColor: "transparent",
            }}
        />
    );
}
