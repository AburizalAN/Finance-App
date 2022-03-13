import Box from '@mui/material/Box'
import styled from '@emotion/styled'

export const AppTitle = styled(Box)`
  h3 {
    font-weight: 700;
    line-height: 27.28px;
  }
`
export const GreenBackground = styled.div`
  background-color: #5DB4A4;
  border-radius: 16px;
  padding: 36px 16px 64px;
  color: white;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  .left {
    flex: 1;
    h5 {
      font-size: 13px;
      line-height: 17.73px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    h4 {
      font-size: 20px;
      line-height: 27.28px;
      font-weight: 800;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
  }
`
export const WhiteBackground = styled.div`
  background-color: white;
  border-radius: 16px;
  border: 1px solid #ECECEC;
  padding: 16px;
  margin: -28px 16px 0px;
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .label {
    font-size: 13px;
    line-height: 17.73px;
    font-weight: 700;
  }
  .value {
    font-size: 13px;
    line-height: 17.73px;
    font-weight: 700;
    color: #51C393;
  }
`