import './globals.css'

export const metadata = {
  title: 'SWOOP AI',
  description: 'SWOOP AI Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
