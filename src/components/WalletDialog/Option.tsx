import React from 'react'
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

export default function Option({
  link = null,
  clickable = true,
  size,
  onClick = null,
  color,
  header,
  subheader,
  icon,
  isActive = false,
  id,
}: {
  link?: string | null
  clickable?: boolean
  size?: number | null
  onClick?: null | (() => void)
  color: string
  header: React.ReactNode
  subheader?: React.ReactNode
  icon: string
  isActive?: boolean
  id: string
}) {
  const content = (
    <>
      <Button variant="contained">
        {header}
        <img src={icon} alt={'Icon'} />
      </Button>
    </>
  )
  if (link) {
    return <Link href={link}>{content}</Link>
  }

  return content
}