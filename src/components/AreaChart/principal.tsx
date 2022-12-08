import Card from 'components/Card'
import { LoadingRows } from 'components/Loader'
import { RowBetween } from 'components/Row'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { darken } from 'polished'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import styled from 'styled-components/macro'

dayjs.extend(utc)

const DEFAULT_HEIGHT = 300

const Wrapper = styled(Card)`
  width: 100%;
  height: ${DEFAULT_HEIGHT}px;
  padding: 1rem;
  padding-right: 2rem;
  display: flex;
  background-color: ${({ theme }) => theme.deprecated_bg0};
  flex-direction: column;
  > * {
    font-size: 1rem;
  }
`

export type AreaChartProps = {
  data: any[]
  color?: string | undefined
  color2?: string | undefined
  height?: number | undefined
  minHeight?: number
  setValue: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setLabel: Dispatch<SetStateAction<string | undefined>> // used for label of value
  setPrincipal: Dispatch<SetStateAction<number | undefined>> // used for label of value
  setTokens: Dispatch<SetStateAction<string[] | undefined>> // used for value on hover
  setSymbols: Dispatch<SetStateAction<string[] | undefined>> // used for value on hover
  setTokensVolumeUSD: Dispatch<SetStateAction<number[] | undefined>> // used for value of hover
  value?: number
  label?: string
  topLeft?: ReactNode | undefined
  topRight?: ReactNode | undefined
  bottomLeft?: ReactNode | undefined
  bottomRight?: ReactNode | undefined
} & React.HTMLAttributes<HTMLDivElement>

const Chart = ({
  data,
  color = '#56B2A4',
  color2 = '#4A2B65',
  value,
  label,
  setValue,
  setLabel,
  setPrincipal,
  setTokens,
  setSymbols,
  setTokensVolumeUSD,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  minHeight = DEFAULT_HEIGHT,
  ...rest
}: AreaChartProps) => {
  const CustomTooltip = (active: any) => {
    if (active.payload && active.payload.length) {
      setLabel(active.label)
      setValue(active.payload[0].value)
      setPrincipal(active.payload[0].payload.principal)
      setTokens(active.payload[0].payload.tokens)
      setSymbols(active.payload[0].payload.symbols)
      setTokensVolumeUSD(active.payload[0].payload.tokensVolume)
    }
    return null
  }

  return (
    <Wrapper minHeight={minHeight} {...rest}>
      <RowBetween>
        {topLeft ?? null}
        {topRight ?? null}
      </RowBetween>
      {data?.length === 0 ? (
        <LoadingRows>
          <div />
          <div />
          <div />
        </LoadingRows>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            onMouseLeave={() => {
              setLabel && setLabel(undefined)
              setValue && setValue(undefined)
              setPrincipal && setPrincipal(undefined)
              setTokens && setTokens(undefined)
              setSymbols && setSymbols(undefined)
              setTokensVolumeUSD && setTokensVolumeUSD(undefined)
            }}
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={darken(0.36, color)} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tickFormatter={(time) => dayjs(time).format('DD')}
              minTickGap={10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area dataKey="volume" type="monotone" stroke={color} fill="url(#gradient)" strokeWidth={2} />
            <Area dataKey="principal" type="monotone" stroke={color2} fill="url(#gradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      )}
      <RowBetween>
        {bottomLeft ?? null}
        {bottomRight ?? null}
      </RowBetween>
    </Wrapper>
  )
}

export default Chart
