import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#e07a5f",
                    borderRadius: "6px",
                    fontFamily: "serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "white",
                    letterSpacing: "-0.5px",
                }}
            >
                SI
            </div>
        ),
        { ...size }
    );
}
