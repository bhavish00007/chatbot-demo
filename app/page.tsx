"use client";

import {useState, useEffect,  useRef} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import LandingSections from "@/components/LandingSections";

export default function Chat() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingSections />
    </div>
  );
}
