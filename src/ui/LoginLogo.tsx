"use client";

import Image from "next/image";
import {
  Paper
} from "@mui/material";
import logo from "@/assets/condor-logo.png";

export default function LoginLogo() {
  return (
    <Paper>
      <Image 
        priority 
        alt="Logo" 
        src={logo}
      />
    </Paper>
  );
}
