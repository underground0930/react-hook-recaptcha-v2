import { useCallback, useEffect, useRef, useState } from 'react'

export type Options = {
  sitekey: string
  scriptId?: string
  hl?: string
  size?: ReCaptchaV2.Size
  badge?: ReCaptchaV2.Badge
  callback: (token: string | null) => void
  expiredCallback?: () => void
  errorCallback?: () => void
}

export type UseRecaptchaResult = {
  recaptchaRef: React.MutableRefObject<HTMLDivElement | null>
  resetRecaptcha: () => void
  executeRecaptcha: () => Promise<void>
}

export const useRecaptchaV2 = ({
  sitekey,
  size,
  scriptId = 'recaptchaApiScript',
  hl = 'ja',
  badge = 'bottomright',
  callback,
  expiredCallback,
  errorCallback,
}: Options): UseRecaptchaResult => {
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const [recaptchaId, setRecaptchaId] = useState<number | null>(null)

  const loadRecaptchaScript = () => {
    if (document.getElementById(scriptId)) return

    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&hl=${hl}`
    script.async = true
    script.defer = true
    script.id = scriptId
    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(renderRecaptcha)
      }
    }
    document.body.appendChild(script)
  }

  const renderRecaptcha = useCallback(() => {
    if (!window.grecaptcha || typeof window.grecaptcha?.render !== 'function') {
      return
    }
    const { current } = recaptchaRef

    // stop reRender
    if (current && current.innerHTML !== '') return

    setRecaptchaId(
      window.grecaptcha.render(current as HTMLElement, {
        sitekey,
        size,
        badge,
        callback,
        'expired-callback': expiredCallback,
        'error-callback': errorCallback,
      }),
    )
  }, [recaptchaId])

  const resetRecaptcha = () => {
    if (window.grecaptcha && recaptchaId !== null) {
      window.grecaptcha.reset(recaptchaId)
    }
  }

  const executeRecaptcha = async () => {
    if (window.grecaptcha && recaptchaId !== null) {
      try {
        await window.grecaptcha.execute(recaptchaId)
      } catch (e) {
        console.error(e)
      }
    }
  }

  useEffect(() => {
    if (!window.grecaptcha) {
      loadRecaptchaScript()
    } else {
      window.grecaptcha.ready(renderRecaptcha)
    }
    return () => {
      resetRecaptcha()
    }
  }, [renderRecaptcha])

  return { recaptchaRef, resetRecaptcha, executeRecaptcha }
}
