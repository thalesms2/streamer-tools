export default async function StreamerPage({ params }: { params: { userName: string } }) {
  const { userName } = await params;
  return (
    <div>
      { userName }
      hello world
    </div>
  )
}