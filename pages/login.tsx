import type { NextPage } from 'next'
import { AppTitle, BodyWrapper } from 'components/style'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import styled from '@emotion/styled'
import GoogleLogin from 'react-google-login'
import Cookie from 'js-cookie'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const bodyStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
const loginButtonStyle = {
  padding: '14px',
  fontSize: '15px',
  fontWeight: '700',
  borderWidth: '2px',
}

const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 0 36px;
`

const MyGoogleButton = (props: any) => {
  return (
    <Button sx={loginButtonStyle} fullWidth variant="outlined" {...props}>
      Login By Google
    </Button>
  )
}

const Login: NextPage = () => {
  const router = useRouter()
  const { redirect = null } = router.query

  const responseGoogle = (response: any) => {
    console.log(response);
    if (Object.keys(response).length > 0) {
      Cookie.set('AuthToken', response.tokenId)
      if (redirect) {
        router.push(`${redirect}`)
      } else {
        router.push('/')
      }
    }
  }

  const clientId: string = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID ?? ''

  useEffect(() => {
    if (Cookie.get('AuthToken')) {
      router.push('/')
    }
  }, [])
  
  return (
    <BodyWrapper sx={bodyStyle}  pt="24px" pb="72px" px="12px">
      <ContainerLogin>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 'bold',
          }}
        >
          Login
        </Typography>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login with Google"
          render={({ onClick, disabled }) => (
            <MyGoogleButton onClick={onClick} disabled={disabled} />
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </ContainerLogin>
    </BodyWrapper>
  )
}

export default Login