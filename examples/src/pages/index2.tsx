import { useState } from 'react'
import { useRecaptchaV2 } from 'react-hook-recaptcha-v2'

const targetId = 'rechapchaTarget'
const scriptId = 'rechapchaScriptId'
const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_V2_HIDDEN_SITE_KEY as string

export default function Home() {
  const { recaptchaRef, recaptchaToken, executeRecaptcha } = useRecaptchaV2({
    sitekey,
    targetId,
    scriptId,
    size: 'invisible',
  })
  const [result, setResult] = useState<string>('')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { username } = event.currentTarget
    await executeRecaptcha()
    console.log(recaptchaToken)
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        token: recaptchaToken,
      }),
    })
      .then((response) => {
        if (response.ok || response.status === 304) {
          return response.json()
        }
        throw Error('response error')
      })
      .then(({ result }) => setResult(result))
      .catch((error) => setResult(error.message))
  }

  return (
    <div className='p-10'>
      <h1 className='font-bold text-3xl mb-5'>FORM EXAMPLE (HIDDEN ver)</h1>
      <h2 className='font-bold text-2xl mb-5'>【result】→ {result}</h2>
      <form onSubmit={onSubmit}>
        <div className='mb-4'>
          <input className='text-stone-950' type='text' name='username' placeholder='username' />
        </div>
        <div className='mb-4'>
          <div id={targetId} ref={recaptchaRef}></div>
        </div>
        <div className='mb-4'>【token】{recaptchaToken}</div>
        <div>
          <button className='bg-white text-stone-950 p-2 disabled:opacity-25'>送信</button>
        </div>
      </form>
    </div>
  )
}
