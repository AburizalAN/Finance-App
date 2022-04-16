import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import MuiButton from '@mui/material/Button'

const InputStyle = `
  width: 100%;
  border: 1px solid #7C58AA80;
  padding: 12px 16px;
  box-shadow: 0px 0px 20px 0px #7C58AA1A;
  border-radius: 8px;
  display: flex;
  align-items: center;
  &:focus-visible {
    outline: none;
  }
`
export const InputWrapper = styled(Box)(() => (`
  ${InputStyle}
  * {
    font-size: 18px;
    font-weight: 700;
    line-height: 24.55px;
    color: '#6B518B';
    &:focus-visible {
      outline: none;
    }
  }
  input {
    width: 100%;
    padding: 0;
    border: none;
  }
`))
export const Input = styled.input(({ width }: any) => ({
  InputStyle,
  color: '#6B518B',
  backgroundColor: '#F6EFFC80',
  fontSize: '13px',
  fontWeight: 700,
  '&::placeholder': {
    color: '#00000050',
  },
  width: width ?? '100%',
}))

export const IconWrapper = styled(Box)(({ bg }: any) => (`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${bg ?? '#FF7575'};
`))
export const Button = styled(MuiButton)(() => (`
  &&& {
    font-size: 15px;
    line-height: 20.46px;
    background-color: #7C58AA;
    border-radius: 16px;
    padding: 12px;
  }
`))