import { useQuery } from '@apollo/client'
import { useEthers } from '@usedapp/core'
import ConnectView from 'components/ConnectView'
import { LoadingView } from 'components/LoadingView'
import MintBanner from 'components/MintBanner'
import { ottoClick } from 'constant'
import Layout from 'Layout'
import { MyOttosContext } from 'MyOttosProvider'
import { useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import NoOttoView from './NoOttoView'
import OttoCard from '../../../components/OttoCard'

const StyledMyOttosPage = styled.div`
  width: 100%;
  /* height: 100%; */
  min-height: 100%;
  background-color: white;
`

const StyledMyOttos = styled.div`
  padding: 20px;
  background-color: white;
  display: grid;
  justify-content: left;
  align-items: center;
  justify-items: center;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, 265px);

  @media ${({ theme }) => theme.breakpoints.mobile} {
    padding: 10px;
    gap: 5px;
    grid-template-columns: 1fr 1fr;
  }
`

const StyledMintBanner = styled.div`
  padding: 30px;
`

enum State {
  Loading,
  NoOttos,
  HasOttos,
}

export default function MyOttosPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { account } = useEthers()
  const { ottos, loading } = useContext(MyOttosContext)
  const state = useMemo(() => {
    if (loading) {
      return State.Loading
    }
    if ((ottos.length || 0) > 0) {
      return State.HasOttos
    }
    return State.NoOttos
  }, [account, loading, ottos])
  const renderContent = useCallback(() => {
    switch (state) {
      case State.Loading:
        return <LoadingView />
      case State.NoOttos:
        return <NoOttoView />
      case State.HasOttos:
        return (
          <>
            <StyledMyOttos>
              {ottos.map((otto, index) => (
                <a
                  key={index}
                  href={otto.tokenId}
                  onClick={async e => {
                    e.preventDefault()
                    ottoClick.play()
                    navigate(otto.tokenId)
                  }}
                >
                  <OttoCard otto={otto} />
                </a>
              ))}
            </StyledMyOttos>
            <StyledMintBanner>
              <MintBanner />
            </StyledMintBanner>
          </>
        )
      default:
        return <ConnectView />
    }
  }, [state, ottos])
  return (
    <Layout title={t('my_ottos.title')} requireConnect>
      <StyledMyOttosPage>{renderContent()}</StyledMyOttosPage>
    </Layout>
  )
}
