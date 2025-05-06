import { ReactNode } from "react";
import "./global.css";

export const metadata = {
  title: "F1GPT",
  description: "F1 RAG Chatbot",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
