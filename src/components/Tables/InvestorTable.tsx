import { Trans } from '@lingui/macro'
import { DarkGreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { LoadingRows } from 'components/Loader/styled'
import Percent from 'components/Percent'
import { Arrow, Break, PageButtons } from 'components/shared'
import { ClickableText, Label } from 'components/Text'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { useTheme } from 'styled-components/macro'
import { ThemedText } from 'theme'
import { InvestorList } from 'types/fund'
import { shortenAddress } from 'utils'
import { formatTime } from 'utils/date'
import { formatDollarAmount } from 'utils/numbers'

const Wrapper = styled(DarkGreyCard)`
  width: 100%;
`

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;

  grid-template-columns: 1.5fr repeat(4, 1fr);

  @media screen and (max-width: 940px) {
    grid-template-columns: 1.5fr repeat(3, 1fr);
    & > *:nth-child(5) {
      display: none;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 1.5fr repeat(4, 1fr);
    & > *:nth-child(5) {
      display: none;
    }
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1.5fr repeat(3, 1fr);
    & > *:nth-child(5) {
      display: none;
    }
    & > *:nth-child(4) {
      display: none;
    }
  }
`

const LinkWrapper = styled(Link)`
  text-decoration: none;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const SORT_FIELD = {
  investor: 'investor',
  current: 'current',
  principal: 'principal',
  ratio: 'profitRatio',
  timestamp: 'time',
}

const DataRow = ({ investor, color }: { investor: InvestorList; color?: string }) => {
  return (
    <LinkWrapper to={'/fund/' + investor.fund + '/' + investor.investor}>
      <ResponsiveGrid>
        <Label fontWeight={400}>{shortenAddress(investor.investor)}</Label>
        <Label end={1} fontWeight={400}>
          {formatDollarAmount(Number(investor.currentUSD))}
        </Label>
        <Label end={1} fontWeight={400}>
          {formatDollarAmount(Number(investor.principalUSD))}
        </Label>
        <Label end={1} fontWeight={400}>
          <Percent value={investor.profitRatio} wrap={false} />
        </Label>
        <Label end={1} fontWeight={400}>
          {formatTime(investor.updatedAtTimestamp.toString(), 8)}
        </Label>
      </ResponsiveGrid>
    </LinkWrapper>
  )
}

export default function InvestorTable({
  investors,
  maxItems = 10,
  color,
}: {
  investors: InvestorList[]
  maxItems?: number
  color?: string
}) {
  // theming
  const theme = useTheme()

  // for sorting
  const [sortField, setSortField] = useState(SORT_FIELD.timestamp)
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  // pagination
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  useEffect(() => {
    let extraPages = 1
    if (investors.length % maxItems === 0) {
      extraPages = 0
    }
    setMaxPage(Math.floor(investors.length / maxItems) + extraPages)
  }, [maxItems, investors])

  const sortedInvestors = useMemo(() => {
    return investors
      ? investors
          .slice()
          .sort((a, b) => {
            if (a && b) {
              return a[sortField as keyof InvestorList] > b[sortField as keyof InvestorList]
                ? (sortDirection ? -1 : 1) * 1
                : (sortDirection ? -1 : 1) * -1
            } else {
              return -1
            }
          })
          .slice(maxItems * (page - 1), page * maxItems)
      : []
  }, [investors, maxItems, page, sortField, sortDirection])

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
    },
    [sortDirection, sortField]
  )

  const arrow = useCallback(
    (field: string) => {
      return sortField === field ? (!sortDirection ? '↑' : '↓') : ''
    },
    [sortDirection, sortField]
  )

  if (!investors) {
    return (
      <LoadingRows>
        <div />
      </LoadingRows>
    )
  }

  return (
    <Wrapper>
      <AutoColumn gap="16px">
        <ResponsiveGrid>
          <ClickableText color={theme.deprecated_text2} onClick={() => handleSort(SORT_FIELD.investor)}>
            <Trans>Invetsor</Trans> {arrow(SORT_FIELD.investor)}
          </ClickableText>
          <ClickableText end={1} color={theme.deprecated_text2} onClick={() => handleSort(SORT_FIELD.current)}>
            <Trans>Current</Trans> {arrow(SORT_FIELD.current)}
          </ClickableText>
          <ClickableText end={1} color={theme.deprecated_text2} onClick={() => handleSort(SORT_FIELD.principal)}>
            <Trans>Principal</Trans> {arrow(SORT_FIELD.principal)}
          </ClickableText>
          <ClickableText end={1} color={theme.deprecated_text2} onClick={() => handleSort(SORT_FIELD.ratio)}>
            <Trans>Profit</Trans> {arrow(SORT_FIELD.ratio)}
          </ClickableText>
          <ClickableText end={1} color={theme.deprecated_text2} onClick={() => handleSort(SORT_FIELD.timestamp)}>
            <Trans>Time</Trans> {arrow(SORT_FIELD.timestamp)}
          </ClickableText>
        </ResponsiveGrid>
        <Break />

        {sortedInvestors.map((t, i) => {
          if (t) {
            return (
              <React.Fragment key={i}>
                <DataRow investor={t} color={color} />
                <Break />
              </React.Fragment>
            )
          }
          return null
        })}
        {sortedInvestors.length === 0 ? <ThemedText.DeprecatedMain>No Investors</ThemedText.DeprecatedMain> : undefined}
        <PageButtons>
          <div
            onClick={() => {
              setPage(page === 1 ? page : page - 1)
            }}
          >
            <Arrow faded={page === 1 ? true : false}>←</Arrow>
          </div>
          <ThemedText.DeprecatedBody>{'Page ' + page + ' of ' + maxPage}</ThemedText.DeprecatedBody>
          <div
            onClick={() => {
              setPage(page === maxPage ? page : page + 1)
            }}
          >
            <Arrow faded={page === maxPage ? true : false}>→</Arrow>
          </div>
        </PageButtons>
      </AutoColumn>
    </Wrapper>
  )
}
