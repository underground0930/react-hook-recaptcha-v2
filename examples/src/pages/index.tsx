import { useState } from 'react'
import { useRecaptchaV2 } from 'react-hook-recaptcha-v2'

const scriptId = 'rechapchaScriptId'
const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_V2_CHECKBOX_SITE_KEY as string

export default function Home() {
  const [token, setToken] = useState<string | null>(null)
  const [result, setResult] = useState<string>('')

  const { recaptchaRef } = useRecaptchaV2({
    sitekey,
    scriptId,
    size: 'compact',
    hl: 'en',
    callback: (token) => setToken(token),
    expiredCallback: () => setToken(null),
    errorCallback: () => {
      alert('recapcha error')
      setToken(null)
    },
  })

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!token) return
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        username: event.currentTarget.username.value,
        token,
        type: 'checkbox',
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
  }

  return (
    <div className='p-10'>
      <h1 className='font-bold text-3xl mb-5'>FORM EXAMPLE (CHECKBOX ver)</h1>
      <h2 className='font-bold text-2xl mb-5'>【result】→ {result}</h2>
      <form onSubmit={onSubmit}>
        <div className='mb-4'>
          <input className='text-stone-950' type='text' name='username' placeholder='username' />
        </div>
        <div className='mb-4'>
          <div ref={recaptchaRef}></div>
        </div>
        <div className='mb-4'>【token】{token}</div>
        <div>
          <button disabled={!token} className='bg-white text-stone-950 p-2 disabled:opacity-25'>
            送信
          </button>
        </div>
      </form>
    </div>
  )
}
