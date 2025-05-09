import { Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

export default function Chart() {
  return (
    <>
      <Typography variant="h5">Duração do Sono x Tempo: </Typography>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["bar A", "bar B", "bar C"],
          },
        ]}
        series={[
          {
            data: [2, 5, 3],
          },
        ]}
        height={250}
      />
    </>
  );
}
