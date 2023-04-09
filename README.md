# react-hook-recaptcha-v2 [![npm version](https://img.shields.io/npm/v/react-hook-recaptcha-v2.svg?style=flat)](https://www.npmjs.com/package/react-hook-recaptcha-v2)

# Features

- react-hook with built-in recaptcha-v2
- Corresponding to checkbox and invisible.

# Install

```bash
npm i react-hook-recaptcha-v2
```

# Requirement

- Node.js: v18.13.0

# Depends on

- react: 18.2.0

# Usage

```typescript
import { useRecaptchaV2 } from 'react-hook-recaptcha-v2'
```

```typescript
const scriptId = 'rechapchaScriptId'
const sitekey = 'xxxxxxxxxxxx'

// checkbox type ////////////////////////////

export function Home {

// set token
const [token, setToken] = useState<string | null>(null)
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
    console.log(token);
    console.log(event.currentTarget.username.value)
    // fetch
  })

  return (
          <form onSubmit={onSubmit}>
            <input type='text' name='username' />
            <div ref={recaptchaRef}></div>
            <button>send</button>
          </form>
        )
}

// invisible type ////////////////////////////

export function Home {
const formRef = useRef<HTMLFormElement>(null)

const { recaptchaRef, executeRecaptcha } = useRecaptchaV2({
  sitekey,
  scriptId,
  size: 'invisible',
  hl: 'ja',
  callback: (token) => {
    if (token) {
      fetchData(token)
    }
  },
})

const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  await executeRecaptcha()
}

const fetchData = (token)=>{
  console.log(token);
  console.log(formRef.current?.username.value)
// fetch
}

  return (
          <form ref={formRef} onSubmit={onSubmit}>
            <input type='text' name='username' />
            <div ref={recaptchaRef}></div>
            <button>send</button>
          </form>
        )
}


```

Check the examples folder for details

# props

| key             | description                                        | default               | required |
| --------------- | -------------------------------------------------- | --------------------- | -------- |
| sitekey         | ※                                                  |                       | ⚫︎      |
| scriptId        | ID to be attached to the script tag to be injected | recaptchaApiScript    |          |
| hl              | ※                                                  | ja                    |          |
| size            | ※                                                  | normal                |          |
| badge           | ※                                                  | bottomright           |          |
| callback        | ※                                                  | (token:string)=> void | ⚫︎      |
| expiredCallback | ※                                                  | ()=> void             |          |
| errorCallback   | ※                                                  | ()=> void             |          |

(※)Please click here for more information.

- https://developers.google.com/recaptcha/docs/display?hl=ja
- https://developers.google.com/recaptcha/docs/invisible?hl=ja

# Return value of hook

| value            | description                    | type                |
| ---------------- | ------------------------------ | ------------------- |
| recaptchaRef     | Reference to recapcha elements | MutableRefObject    |
| executeRecaptcha | ※                              | () => Promise<void> |
| resetRecaptcha   | ※                              | () => void          |

(※)Please click here for more information.

- https://developers.google.com/recaptcha/docs/display?hl=ja
- https://developers.google.com/recaptcha/docs/invisible?hl=ja

# Get recaptcha sitekey and secretkey

https://www.google.com/recaptcha/admin

# Author

- https://twitter.com/resistance_gowy
- go.nishiduka.1985@gmail.com

# License

"react-hook-recaptcha-v2" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
