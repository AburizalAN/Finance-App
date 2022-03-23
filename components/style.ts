import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import styled from '@emotion/styled'
import { createTheme} from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        root: `
          min-height: 0;
          .Mui-selected {
            color: #484848 !important;
          }
        `,
        indicator: {
          display: 'none'
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: `
          padding: 0;
        `
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: `
          font-size: 1rem;
        `
      }
    }
  },
  typography: {
    fontFamily: '"Nunito Sans", "Roboto", "Helvetica", "Arial", sans-serif',
  },
})

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
export const Card = styled(Box)((props: any) => {
  const { radius, padding } = props
  return `
  background-color: white;
  padding: ${padding ?? '12px'};
  border-radius: ${radius ?? '12px'};
  border: 1px solid #ECECEC;
  // box-shadow: 0px 4px 50px 0px #00000014;
`
})
export const SliderGrid = styled(Grid)`
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: visible;
`
SliderGrid.defaultProps = {
  container: true,
  className: 'scrollX',
}