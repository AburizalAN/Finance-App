import { useState } from 'react'
import styled from '@emotion/styled'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Bill from 'components/icons/Bill'
import MuiButton from '@mui/material/Button'
import Checklist from 'components/icons/Checklist'

interface PropTypes {
  open: boolean
  handleClose: () => void
}

const Container = styled(Box)(() => (`
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 12px;
`))

const ModalBox = styled(Box)(() => (`
  background-color: #FCFCFC;
  border-radius: 12px;
  padding: 16px;
`))
const ModalTitle = styled.div`
  font-size: 13px;
  line-height: 17.73px;
  font-weight: 700;
  margin-bottom: 22px;
`
const TagItemCard = styled(Grid)(({ isActive }: any) => (`
  border: 1px solid #7C58AA80;
  background: ${isActive ? '#7C58AA80' : '#FFFFFF80'};
  color: ${isActive ? '#FFFFFF' : '#484848'};
  border-radius: 8px;
  padding: 12px;
  column-gap: 12px;
  .text {
    font-size: 13px;
    line-height: 1;
    font-weight: 700;
  }
`))
const IconWrapper = styled(Box)(() => (`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #FF7575;
`))
const Button = styled(MuiButton)(() => (`
  &&& {
    font-size: 15px;
    line-height: 20.46px;
    border-radius: 16px;
    padding: 12px;
  }
`))

const ModalSelectTag = ({ open, handleClose }: PropTypes) => {
  const [active, setActive] = useState<any>(null)
  
  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Container>
          <ModalBox>
            <ModalTitle>
              Pilih Tag
            </ModalTitle>
            <Grid mb="32px" container direction="column" sx={{ rowGap: '12px' }}>
              {[...Array(5)].map((_, i) => (
                <TagItemCard onClick={() => setActive(i)} isActive={active === i} key={i} container alignItems="center">
                  <IconWrapper>
                    <Bill sx={{ fontSize: '16px' }} />
                  </IconWrapper>
                  <Grid item xs className="text">
                    Tag 1
                  </Grid>
                  {active === i && (
                    <Checklist />
                  )}
                </TagItemCard>
              ))}
            </Grid>
            <Button variant="contained" color="primary" fullWidth disableElevation>
              Pilih Tag
            </Button>
          </ModalBox>
        </Container>
      </Fade>
    </Modal>
  )
}

export default ModalSelectTag