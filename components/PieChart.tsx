import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import { parseCurrency } from 'services/helper-client';

ChartJS.register(ArcElement);

// export const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderWidth: 0,
//     },
//   ],
// };

const Container = styled(Box)`
  width: 253px;
  margin: auto;
  position: relative;
`
const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #5C4949;
  font-size: 20px;
  text-align: center;
  div:nth-of-type(1) {
    font-weight: 700;
    margin-bottom: 6px;  
  }
  div:nth-of-type(2) {
    font-weight: 800;
  }
`

interface PropTypes {
  value?: number
  data?: any
}

const PieChart = ({ value = 0, data }: PropTypes) => {
  return (
    <Container>
      <Doughnut options={{ cutout: '70%' }} data={data} />
      <Text>
        <div>Pengeluaran</div>
        <div>Rp{parseCurrency(value)}</div>
      </Text>
    </Container>
  )
}

export default PieChart