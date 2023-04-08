# react-hook-recaptcha-v2 [![npm version](https://img.shields.io/npm/v/react-hook-recaptcha-v2.svg?style=flat)](https://www.npmjs.com/package/react-hook-recaptcha-v2)

# Features

- react-hook with built-in recaptcha-v2
- Corresponding to checkbox and invisible.

# Requirement

- Node.js: v18.13.0

# Depends on

- react: 18.2.0

# Usage

```typescript
import { useRecaptchaV2 } from 'react-hook-recaptcha-v2'
```

```typescript
const targetId = 'rechapchaTarget'
const scriptId = 'rechapchaScriptId'
const sitekey = 'xxxxxxxxxxxx'

// checkbox type
const { recaptchaRef, recaptchaToken } = useRecaptchaV2({
  sitekey,
  targetId,
  scriptId,
  size: 'compact',
  hl: 'en',
})

// invisible type
const { recaptchaRef, recaptchaToken, executeRecaptcha } = useRecaptchaV2({
  sitekey,
  targetId,
  scriptId,
  size: 'invisible',
  hl: 'ja',
})
```

Check the examples folder for details

# props

| key             | description                                         | default            | required |
| --------------- | --------------------------------------------------- | ------------------ | -------- |
| sitekey         | ※                                                   |                    | ⚫︎      |
| targetId        | ID to be attached to the target element of recapcha |                    | ⚫︎      |
| scriptId        | ID to be attached to the script tag to be injected  | recaptchaApiScript |          |
| hl              | ※                                                   | ja                 |          |
| size            | ※                                                   | normal             |          |
| badge           | ※                                                   | bottomright        |          |
| callback        | ※                                                   |                    |          |
| expiredCallback | ※                                                   |                    |          |
| errorCallback   | ※                                                   |                    |          |

(※)Please click here for more information.

- https://developers.google.com/recaptcha/docs/display?hl=ja
- https://developers.google.com/recaptcha/docs/invisible?hl=ja

# Return value of hook

| value            | description                                            | type                |
| ---------------- | ------------------------------------------------------ | ------------------- |
| recaptchaRef     | Reference to recapcha elements                         | MutableRefObject    |
| recaptchaToken   | Token that can be obtained through recapcha challenges | string or null      |
| executeRecaptcha | ※                                                      | () => Promise<void> |
| resetRecaptcha   | ※                                                      | () => void          |

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
