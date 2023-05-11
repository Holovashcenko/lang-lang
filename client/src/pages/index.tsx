import { useLogoutMutation } from '@/api/auth-api'
import { Button } from '@/components'
import { ButtonColors, ButtonSizes } from '@/components/button/types'

export default function Home() {
  const [logout] = useLogoutMutation()
  return (
    <main>
      <Button
      size={ButtonSizes.Medium}
      color={ButtonColors.Red}
        onClick={() => {
          logout('')
        }}
      >
        Logout
      </Button>
    </main>
  )
}
