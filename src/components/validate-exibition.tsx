export default function ValidateExibition({
  children, show
}: Readonly<{
  children: React.ReactNode;
  show?: boolean;
}>) {
  return(
    <>
      { show ? children : null }
    </>
  )
}
