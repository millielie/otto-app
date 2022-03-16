import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const StyledHomePage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 3rem;
  border: solid 1px orange;
`

const Header = styled.div`
  width: 100%;
  font-size: 2.3rem;
`

const HomePage = () => {
  const { t } = useTranslation()
  return (
    <StyledHomePage>
      <Header>{t('title')}</Header>
      <div style={{ background: '#666', width: '580px', height: '1800px' }} />
    </StyledHomePage>
  )
}

export default HomePage
