import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import MuiButton from '@mui/material/Button'

const InputStyle = {
  padding: '12px 16px',
  border: '1px solid #7C58AA80',
  boxShadow: '0px 0px 20px 0px #7C58AA1A',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  '&:focus-visible': {
    outline: 'none',
  }
}
export const InputWrapper = styled(Box)(() => ({
  ...InputStyle,
  columnGap: '12px',
  '*': {
    fontSize: '18px',
    fontWeight: '700',
    lineHeight: '24.55px',
    color: '#6B518B',
    '&:focus-visible': {
      outline: 'none',
    }
  },
  'input': {
    flex: '1',
    padding: '0',
    border: 'none',
    backgroundColor: 'transparent',
  }
}))
export const Input = styled.input(({ width }: any) => ({
  ...InputStyle,
  color: '#6B518B',
  backgroundColor: '#F6EFFC80',
  fontSize: '15px',
  fontWeight: 700,
  lineHeight: '20.46px',
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
    &.Mui-disabled {
      background-color: #eeeeee;
    }
  }
`))

interface TypographyProps {
  color?: string
  fontSize?: string
  weight?: string
  lineHeight?: string
  variant?: string
}

export const Typography = styled(Box)(
  ({ weight, fontSize, color, lineHeight, variant = 'medium' }: TypographyProps) => {
    const globalStyles = {
      color:
        color === 'secondary'
          ? '#6f6f6f'
          : color === 'primary'
          ? '#484848'
          : color
          ? color
          : '#484848',
      fontWeight: weight || 'normal',
    };

    switch (variant) {
      case 'medium':
        return {
          ...globalStyles,
          fontSize: fontSize || '15px',
          lineHeight: lineHeight || '20.46px',
        };
      case 'small':
        return {
          ...globalStyles,
          fontSize: fontSize || '13px',
          lineHeight: lineHeight || '17.73px',
        };
    }
  }
);