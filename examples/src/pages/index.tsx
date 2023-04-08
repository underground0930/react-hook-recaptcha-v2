import { useRecaptchaV2 } from 'react-hook-recaptcha-v2'

export default function Home() {
  return (
    <div className='p-10'>
      <div>
        <h1 className='font-bold text-2xl mb-5'>FORM EXAMPLE(BADGE)</h1>
        <div className='mb-4'>
          <input type='text' name='username' placeholder='username' />
        </div>
        <div className='mb-4'>
          <textarea name='detail' placeholder='detail' />
        </div>
        <div></div>
      </div>
    </div>
  )
}
