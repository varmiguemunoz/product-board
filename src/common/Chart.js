import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Chart = ({ ChartData }) => {
  return (
    <Bar
      data={ChartData}
      options={{
        Title: {
          display: true,
          text: "Category",
          fontSize: 25,
        },
        legend: {
          display: true,
          position: "right",
        },
      }}
    />
  );
};
