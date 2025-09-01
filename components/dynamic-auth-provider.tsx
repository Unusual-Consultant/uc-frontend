import dynamic from 'next/dynamic'

const AuthenticatedUserProvider = dynamic(
  () => import('@/context/AuthenticatedUserProvider').then(mod => ({ default: mod.AuthenticatedUserProvider })),
  { ssr: false }
)

export { AuthenticatedUserProvider }
