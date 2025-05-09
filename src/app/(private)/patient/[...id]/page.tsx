/* eslint-disable @typescript-eslint/no-explicit-any */
import Chart from "@/ui/Chart";
import {
  formatToHHmm,
  headersKey,
  timestampToWeekDay,
  translateHeader,
} from "@/utils";
import { ArrowDropDown, BarChart } from "@mui/icons-material";
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
interface IDataItem {
  [key: string]: any;
}
// interface IProps {
//   params: {
//     id: string;
//   };
// }

const sleepEntries = [
  {
    createdAt: new Date("2025-05-05T00:00:00").toISOString(), // segunda
    sleepDuration: "375",
    bedTime: "22:45",
    wakeUps: 1,
    medicationTaken: false,
  },
  {
    createdAt: new Date("2025-05-06T00:00:00").toISOString(), // terça
    sleepDuration: "491",
    bedTime: "00:10",
    wakeUps: 3,
    medicationTaken: true,
  },
  {
    createdAt: new Date("2025-05-07T00:00:00").toISOString(), // quarta
    sleepDuration: "492",
    bedTime: "21:50",
    wakeUps: 0,
    medicationTaken: false,
  },
  {
    createdAt: new Date("2025-05-08T00:00:00").toISOString(), // quinta
    sleepDuration: "390",
    bedTime: "01:20",
    wakeUps: 4,
    medicationTaken: true,
  },
  {
    createdAt: new Date("2025-05-09T00:00:00").toISOString(), // sexta
    sleepDuration: "330",
    bedTime: "23:10",
    wakeUps: 2,
    medicationTaken: false,
  },
  {
    createdAt: new Date("2025-05-10T00:00:00").toISOString(), // sábado
    sleepDuration: "330",
    bedTime: "23:10",
    wakeUps: 2,
    medicationTaken: false,
  },
  {
    createdAt: new Date("2025-05-11T00:00:00").toISOString(), // domingo
    sleepDuration: "330",
    bedTime: "23:10",
    wakeUps: 2,
    medicationTaken: false,
  },
];
//{ params }: IProps
export default async function PatientData() {
  //const id = params.id;
  // const response = await fetch(`${process.env.FLASKAPI_BASE_URL!}/api/patient/${id}`, { method: "GET" });
  const isOK = true; //response.ok;
  if (isOK) {
    const data = sleepEntries.map((item) => ({
      ...item,
      createdAt: timestampToWeekDay(item.createdAt),
      sleepDuration: formatToHHmm(Number(item.sleepDuration)),
      medicationTaken: item.medicationTaken ? "SIM" : "NÃO",
    })); //await response.json();
    const isEmpty = data.length === 0;
    if (isEmpty) {
      return (
        <Typography component="p" variant="body2">
          A Lista esta vazia!
        </Typography>
      );
    }
    return (
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
                    {Object.keys(data[0])
                      .map((item, index) => (
                        <TableCell align="center" key={`${item}-${index}-data`}>
                          {translateHeader(item as headersKey)}
                        </TableCell>
                      ))
                      .filter(
                        (item) => item.key !== "name" && item.key !== "id"
                      )}
                  </TableRow>
                </TableHead>

                <TableBody key="data-table-body">
                  {data.map((item: any) => (
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
                    {Object.keys(data[0])
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
    );
  }
}
