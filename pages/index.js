import { signIn, signOut, useSession } from 'next-auth/client'

export default function Index() {
  const [session, loading] = useSession()

  console.log(session)
  console.log(loading)

  return (
    <main>
      <button onClick={() => signIn('apple')}>Sign in with Apple</button>
      <button onClick={signOut}>Sign out</button>
    </main>
  )
}
