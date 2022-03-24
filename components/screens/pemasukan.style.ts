import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import styled from '@emotion/styled'

export const Header = styled(Box)(({ pt }: any) => `
  padding: 12px;
  padding-top: ${pt ?? 'inherit'};
  background-color: #5DB4A4;
  h1 {
    color: #fff;
  }
`)

export const Image = styled.img`
  margin: auto;
  display: block;
`
export const TitleHeader = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  margin-top: 12px;
  text-align: center;
  color: white;
`
export const DateTitle = styled.div`
  font-size: 13px;
  line-height: 17.73px;
  font-weight: 700;
  color: #9F9F9F;
  text-transform: uppercase;
  margin-bottom: 20px;
`
export const TransactionItem = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  font-size: 13px;
  line-height: 17.73px;
  &:not(:last-child) {
    margin-bottom: 10px
  }
  .label {
    font-weight: 600;
  }
  .date {
    font-size: 10px;
    line-height: 13.64px;
    color: #838383;
  }
  .price {
    font-weight: 700;
    color: #51C393;
  }
`
export const BottomFixSection = styled(Box)(({ bg }: any) => `
  &&& {
    background-color: ${bg ?? 'transparent'};
    position: fixed;
    bottom: 0;
    left: 50% !important;
    transform: translateX(-50%);
    width: 100%;
    max-width: 500px;
    padding: 12px 12px 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
`)
export const BottomFixButton = styled(Button)`
  text-transform: none;
  border-radius: 8px;
  box-shadow: 0px 0px 20px 0px #7C58AA1A;
  color: #5DB4A4;
  font-size: 13px;
  line-height: 1;
  font-weight: 700;
  padding: 12px 18px;
  justify-content: start;
  .MuiButton-startIcon {
    margin-right: 16px;
  }
`