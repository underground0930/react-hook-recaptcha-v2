import { useRef, useState } from 'react'
import { useRecaptchaV2 } from 'react-hook-recaptcha-v2'

const scriptId = 'rechapchaScriptId'
const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_V2_HIDDEN_SITE_KEY as string

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null)
  const { recaptchaRef, executeRecaptcha, resetRecaptcha } = useRecaptchaV2({
    sitekey,
    scriptId,
    size: 'invisible',
    callback: (token) => {
      if (token) {
        fetchData(token)
      }
    },
  })
  const [result, setResult] = useState<string>('')

  const fetchData = async (token: string) => {
    const { value } = formRef.current?.username
    console.log(token)
    console.log(value)
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        username: value,
        token,
      }),
    })
      .then((response) => {
        if (response.ok || response.status === 304) {
          return response.json()
        }
        throw Error('response error')
      })
      .then(({ result }) => {
        if (result === 'success') {
          location.href = '/thanks'
          return
        }
        setResult(result)
      })
      .catch((error) => setResult(error.message))
      .finally(() => {
        resetRecaptcha()
      })
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await executeRecaptcha()
  }

  return (
    <div className='p-10'>
      <h1 className='font-bold text-3xl mb-5'>FORM EXAMPLE (HIDDEN ver)</h1>
      <h2 className='font-bold text-2xl mb-5'>【result】→ {result}</h2>
      <form ref={formRef} onSubmit={onSubmit}>
        <div className='mb-4'>
          <input className='text-stone-950' type='text' name='username' placeholder='username' />
        </div>
        <div className='mb-4'>
          <div ref={recaptchaRef}></div>
        </div>
        <div>
          <button className='bg-white text-stone-950 p-2 disabled:opacity-25'>送信</button>
        </div>
      </form>
    </div>
  )
}
