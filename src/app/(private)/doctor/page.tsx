"use client";

const sleepEntries = [
  {
    id: "1",
    name: "fake",
  },
  {
    id: "2",
    name: "fake",
  },
  {
    id: "3",
    name: "fake",
  },
  {
    id: "4",
    name: "fake",
  },
  {
    id: "5",
    name: "fake",
  },
  {
    id: "6",
    name: "fake",
  },
  {
    id: "7",
    name: "fake",
  },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import {
  CircularProgress,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
  Input,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { headersKey, translateHeader } from "@/utils";
import { useState } from "react";

interface IDataItem {
  [key: string]: any;
}

export default function DoctorHome() {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState(sleepEntries);
  const [isLoading, setIsLoading] = useState(false);
  const isEmpty = data && data.length === 0;
  const router = useRouter();
  return (
    <>
      {error && !isLoading && (
        <Typography component="p" variant="body2">
          {error}
        </Typography>
      )}
      {!error && isLoading && <CircularProgress />}
      {!error && !isLoading && isEmpty && (
        <Typography component="p" variant="body2">
          A Lista esta vazia!
        </Typography>
      )}
      {!error && !isLoading && !isEmpty && (
        <>
          <Typography variant="h4">Lista de Pacientes</Typography>
          <Box sx={{ mt: "1rem" }}>
            <Input
              sx={{ alignSelf: "flex-end" }}
              placeholder="Busca por nome"
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </Box>
          <TableContainer sx={{ mt: "1rem" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {Object.keys(data[0]).map((item) => (
                    <TableCell align="center" key={item}>
                      {translateHeader(item as headersKey)}
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item: any) => (
                  <TableRow key={item.id}>
                    {Object.keys(item).map((key) => (
                      <TableCell align="center" key={key}>
                        {String(item[key as keyof IDataItem])}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button
                        id={item.id}
                        variant="text"
                        onClick={() => router.push(`/patient/${item.id}`)}
                      >
                        Visualizar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Stack spacing={2} alignItems="center" margin="0.5rem">
              <Pagination count={10} />
            </Stack>
          </TableContainer>
        </>
      )}
    </>
  );
}
