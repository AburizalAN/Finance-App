import Box from '@mui/material/Box'
import styled from '@emotion/styled'

export const Header = styled(Box)(({ pt, bg }: any) => `
  padding: 12px;
  padding-top: ${pt ?? 'inherit'};
  background-color: ${bg ?? '#7C58AA'};
  h1 {
    color: #fff;
  }
`)
export const TitleHeader = styled.div`
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  margin-top: 12px;
  text-align: center;
  color: white;
`
export const Image = styled.img`
  margin: auto;
  display: block;
`