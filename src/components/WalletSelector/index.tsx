import { useEthers } from '@usedapp/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { ContentLarge } from 'styles/typography'
import CoinbaseWalletIcon from 'assets/wallets/coinbase.png'
import metamask from 'assets/wallets/metamask.jpg'
import walletConnect from 'assets/wallets/walletconnect.jpg'
import { selectConnectingWallet, walletConnected } from '../../store/uiSlice'
import Popup from '../Popup'
import Banner from './wallet.png'

const CoinbaseWallet = new WalletLinkConnector({
  url: 'https://polygon-rpc.com',
  appName: 'Ottopia',
  supportedChainIds: [137],
})

export const walletConnectConnector = new WalletConnectConnector({
  rpc: {
    137: 'https://polygon-rpc.com',
  },
  qrcode: true,
})

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const StyledBanner = styled.img`
  width: 180px;
`

const Option = styled.button`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  background: white;
  border: 4px solid ${({ theme }) => theme.colors.lightGray300};
  border-radius: 10px;

  padding: 0 20px;
`

const Name = styled(ContentLarge)`
  display: flex;
  align-items: center;
  flex: 1;
`

const Icon = styled.img`
  width: 36px;
`

const WalletSelector = (): JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { account, activateBrowserWallet, activate } = useEthers()
  const connectingWallet = useSelector(selectConnectingWallet)
  return (
    <Popup
      show={connectingWallet && !account}
      close={() => dispatch(walletConnected())}
      header={t('wallet_selector_head')}
    >
      <StyledContainer>
        <StyledBanner src={Banner} />
        <Option onClick={() => activateBrowserWallet()}>
          <Name>Metamask</Name>
          <Icon src={metamask} alt="Metamask logo" />
        </Option>
        <Option onClick={() => activate(walletConnectConnector)}>
          <Name>WalletConnect</Name>
          <Icon src={walletConnect} alt="WalletConnect logo" />
        </Option>
        <Option onClick={() => activate(CoinbaseWallet)}>
          <Name>Coinbase Wallet</Name>
          <Icon src={CoinbaseWalletIcon} alt="Coinbase Wallet" />
        </Option>
      </StyledContainer>
    </Popup>
  )
}

export default WalletSelector
