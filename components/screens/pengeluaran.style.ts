import styled from '@emotion/styled'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { Card, AddButton } from 'components/style'

export const ThisCard = styled(Card)`
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  padding: 16px;
  column-gap: 16px;
  width: 100%;
  .icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FF7575;
    border-radius: 50%;
  }
  h5 {
    font-size: 15px;
  }
`
export const ThisAddButton = styled(AddButton)`
  position: fixed;
  transform: none;
  bottom: 12px;
  right: 12px;
  background-color: #7C58AA !important;
`
export const ThisLinearProgress = styled(LinearProgress)(({ theme }) => ({
  borderRadius: '50px',
  height: 4,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'transparent',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#66DA94',
  },
}));