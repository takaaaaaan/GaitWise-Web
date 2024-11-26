import '@/styles/globals.css'

import StyledComponentsRegistry from '@/lib/registry'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </>
  )
}
