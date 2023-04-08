import { useCallback, useEffect, useRef, useState } from 'react'

export type Props = {
  sitekey: string
  targetId: string
  scriptId?: string
  hl?: string
  size?: ReCaptchaV2.Size
  badge?: ReCaptchaV2.Badge
  callback?: () => void
  expiredCallback?: () => void
  errorCallback?: () => void
}

export type UseRecaptchaResult = {
  recaptchaRef: React.MutableRefObject<HTMLDivElement | null>
  recaptchaToken: string | null
  resetRecaptcha: () => void
  executeRecaptcha: () => Promise<void>
}

export const useRecaptchaV2 = ({
  sitekey,
  targetId,
  size,
  scriptId = 'recaptchaApiScript',
  hl = 'ja',
  badge = 'bottomright',
  callback,
  expiredCallback,
  errorCallback,
}: Props): UseRecaptchaResult => {
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [recaptchaInstance, setRecaptchaInstance] = useState<number | null>(null)

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

    const target = document.getElementById(targetId)

    // stop reRender
    if (target && target.innerHTML !== '') return

    setRecaptchaInstance(
      window.grecaptcha.render(recaptchaRef.current as HTMLElement, {
        sitekey,
        size,
        badge,
        callback: (token: string) => {
          setRecaptchaToken(token)
          callback?.()
        },
        'expired-callback': () => {
          setRecaptchaToken(null)
          expiredCallback?.()
        },
        'error-callback': () => {
          setRecaptchaToken(null)
          errorCallback?.()
        },
      }),
    )

    return () => {
      resetRecaptcha()
    }
  }, [recaptchaInstance])

  const resetRecaptcha = () => {
    if (window.grecaptcha && recaptchaInstance !== null) {
      window.grecaptcha.reset(recaptchaInstance)
    }
  }

  const executeRecaptcha = async () => {
    if (window.grecaptcha && recaptchaInstance !== null) {
      try {
        await window.grecaptcha.execute(recaptchaInstance)
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
  }, [renderRecaptcha])

  return { recaptchaRef, recaptchaToken, resetRecaptcha, executeRecaptcha }
}
