"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Chart from "@/ui/Chart";
import {
  formatToHHmm,
  headersKey,
  timestampToWeekDay,
  translateHeader,
} from "@/utils";
import { ArrowDropDown } from "@mui/icons-material";
import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Input,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
interface IDataItem {
  [key: string]: any;
}
interface IProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PatientData({ params }: IProps) {
  const { id } = React.use(params);
  const [data, setData] = useState<IDataItem[]>([] as IDataItem[]);
  const [error, setError] = useState<string | null>(null);
  const base_url = process.env.FLASKAPI_BASE_URL!;
  const fetchPatientData = useCallback(async () => {
    const URI = new URL(`${base_url}/api/sleepdiary/${id}`);
    try {
      const response = await fetch(URI, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const isOk = response.ok;
      if (isOk) {
        const json = await response.json();
        console.log({ json });
        setData(
          json.map((item: any) => ({
            ...item,
            createdAt: timestampToWeekDay(item.createdAt),
            sleepDurationInMinutes: formatToHHmm(
              Number(item.sleepDurationInMinutes)
            ),
            tookMedication: item.tookMedication ? "SIM" : "NÃO",
          }))
        );
        return;
      }
      setError(response.statusText);
    } catch (error: unknown) {
      const err = error as Error;
      setError(err.message);
    }
  }, [id]);

  useEffect(() => {
    fetchPatientData();
  }, [fetchPatientData]);

  return (
    <>
      {error && <Typography>{error}</Typography>}

      {!error && (
        <>
          <Chart />
          <Accordion sx={{ mt: "1rem" }} key="data">
            <AccordionSummary
              expandIcon={<ArrowDropDown />}
              aria-controls="panel-content"
              id="panel-data-header"
            >
              <Typography component="span">Dados</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h5">Histórico: </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: "1rem" }}>
                <Typography sx={{ mr: "1rem" }}>de:</Typography>
                <Input type="date" name="from" />
                <Typography sx={{ mr: "1rem" }}>até:</Typography>
                <Input type="date" name="to" />
              </Box>
              <TableContainer sx={{ mt: "1rem" }} key="data-table-container">
                <Table stickyHeader size="small" key="data-table">
                  <TableHead key="data-table-head">
                    <TableRow>
                      {data &&
                        data.length > 0 &&
                        Object.keys(data[0])
                          .map((item, index) => (
                            <TableCell
                              align="center"
                              key={`${item}-${index}-data`}
                            >
                              {translateHeader(item as headersKey)}
                            </TableCell>
                          ))
                          .filter(
                            (item) => item.key !== "name" && item.key !== "id"
                          )}
                    </TableRow>
                  </TableHead>

                  <TableBody key="data-table-body">
                    {data &&
                      data.length > 0 &&
                      data.map((item: any) => (
                        <TableRow key={item.createdAt}>
                          {Object.keys(item)
                            .map((key, index) => (
                              <TableCell align="center" key={`${key}-${index}`}>
                                {String(item[key as keyof IDataItem])}
                              </TableCell>
                            ))
                            .filter(
                              (item) => item.key !== "name" && item.key !== "id"
                            )}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <Stack spacing={2} alignItems="center" margin="0.5rem">
                  <Pagination count={10} />
                </Stack>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mt: "1rem" }} key="stats">
            <AccordionSummary
              expandIcon={<ArrowDropDown />}
              aria-controls="panel-content"
              id="panel-stats-header"
            >
              <Typography component="span">Estatisticas</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h5">Médias: </Typography>
              <TableContainer sx={{ mt: "1rem" }}>
                <Table stickyHeader size="small" key="stats-table">
                  <TableHead>
                    <TableRow>
                      {data &&
                        data.length > 0 &&
                        Object.keys(data[0])
                          .filter((item) => item !== "createdAt")
                          .map((item, index) => (
                            <TableCell
                              align="center"
                              key={`${item}-${index}-stats`}
                            >
                              {translateHeader(item as headersKey)}
                            </TableCell>
                          ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key="avarege">
                      <TableCell key="avg-sleepDuration" align="center">
                        <Typography>6h:15min</Typography>
                      </TableCell>
                      <TableCell key="avg-bedtime" align="center">
                        <Typography>23:32</Typography>
                      </TableCell>
                      <TableCell key="avg-wakeups" align="center">
                        <Typography>2</Typography>
                      </TableCell>
                      <TableCell key="avg-tookmedicine" align="center">
                        <Typography>NÃO</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </>
  );
}
