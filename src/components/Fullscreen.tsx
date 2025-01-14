import { ReactNode } from 'react'
import styled from 'styled-components/macro'

const StyledPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

const Background = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`

const Container = styled.div`
  position: relative;
  width: 80%;
  background-color: ${({ theme }) => theme.colors.crownYellow};
  padding: 6px;
  max-width: 880px;

  border: 4px solid ${props => props.theme.colors.otterBlack};
  border-radius: 20px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    width: 100%;
  }
`

const StyledInnerContainer = styled.div<{ background?: string }>`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.otterBlack};

  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ background }) => background || 'transparent'};
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

interface Props {
  show?: boolean
  background?: string
  children: ReactNode
}

const Fullscreen = ({ show = true, background, children }: Props) => {
  if (!show) return null

  return (
    <StyledPopup>
      <Background />
      <Container>
        <StyledInnerContainer background={background}>
          <Content>{children}</Content>
        </StyledInnerContainer>
      </Container>
    </StyledPopup>
  )
}

export default Fullscreen
