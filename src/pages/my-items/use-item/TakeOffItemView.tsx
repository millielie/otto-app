import Arrow from 'assets/ui/arrow-right-yellow.svg'
import Button from 'components/Button'
import OttoCard from 'components/OttoCard'
import Item from 'models/Item'
import Otto from 'models/Otto'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'
import { Headline } from 'styles/typography'
import ItemPreviewCard from './ItemPreviewCard'

const StyledWearItemView = styled.div`
  padding: 20px;
  flex: 6;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    width: 100%;
    padding-top: 60px;
  }
`

const StyledBottomContainer = styled.div`
  display: flex;
  gap: 40px;
`

const StyledOttoPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

const StyledItemPreview = styled.div`
  display: flex;
  gap: 10px;
`

const StyledOttoCard = styled(OttoCard)`
  @media ${({ theme }) => theme.breakpoints.mobile} {
    width: 70%;
  }
`

const StyledUseButton = styled(Button)`
  width: 60%;
`

const StyledPickerTitle = styled.section``

interface Props {
  item: Item
  otto: Otto | null
  onUse: () => void
}

export default function TakeOffItemView({ item, otto, onUse }: Props) {
  const { t } = useTranslation()
  return (
    <StyledWearItemView>
      <StyledPickerTitle>
        <Headline>{t('my_items.take_off_item.title')}</Headline>
      </StyledPickerTitle>
      <StyledBottomContainer>
        {otto && <StyledOttoCard otto={otto} item={item} takeOff />}
        <StyledOttoPreviewContainer>
          <StyledItemPreview>
            <ItemPreviewCard title={t('my_items.wear_item.current_equipped')} item={item} />
            <img width={30} src={Arrow} alt="arrow" />
            <ItemPreviewCard title={t('my_items.wear_item.replaced')} />
          </StyledItemPreview>
          <StyledUseButton Typography={Headline} onClick={onUse}>
            {t('my_items.take_off')}
          </StyledUseButton>
        </StyledOttoPreviewContainer>
      </StyledBottomContainer>
    </StyledWearItemView>
  )
}
