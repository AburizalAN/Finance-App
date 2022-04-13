import { ReactNode } from 'react';
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import ArrowLeft from 'components/icons/ArrowLeft'
import { useRouter } from 'next/router'

interface PropTypes {
  backAction?: any
  rightContent?: ReactNode
  title?: string
  variant?: string
}

export const Container = styled.div`
  position: fixed;
  z-index: 999;
  width: 100%;
  max-width: 500px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  padding: 12px;
`
export const TopBarTitle = styled.div`
  font-size: 13px;
  line-height: 1;
  font-weight: 700;
  color: #fff;
  margin-right: auto;
`

const TopBar = ({ 
  backAction = null,
  title = 'title',
  rightContent = null,
  variant = 'light'
}: PropTypes) => {
  const router = useRouter()

  return (
    <Container>
      <IconButton onClick={backAction ? backAction : () => router.back()} sx={{ marginRight: '12px' }}>
        <ArrowLeft 
          fill={variant === 'light' ? '#484848' : variant === 'dark' ? 'white' : null } 
          sx={{ width: 16, height: 16 }}
        />
      </IconButton>
      <TopBarTitle style={{ color: variant === 'dark' ? '#fff' : '#484848' }}>
        {title}
      </TopBarTitle>
      {rightContent}
    </Container>
  )
}

export default TopBar