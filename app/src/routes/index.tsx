import { createFileRoute } from '@tanstack/react-router'
import { Canvas } from '~/components/Canvas'
export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-2 h-svh">
      <Canvas/>
    </div>
  )
}
