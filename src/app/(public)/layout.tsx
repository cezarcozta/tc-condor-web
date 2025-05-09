import { Box } from "@mui/material";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box alignSelf='center' mt='10rem'>
      {children}
    </Box>
  );
}
