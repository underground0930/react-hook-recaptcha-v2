import type { NextApiRequest, NextApiResponse } from 'next'

const verifyRecaptcha = async ({ token, secretkey }: { token: string; secretkey: string }): Promise<string> => {
  return await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${token}`, {
    method: 'POST',
  })
    .then((response) => {
      if (response.ok || response.status === 304) {
        return response.json()
      }
      throw new Error('response')
    })
    .then((result) => {
      if (result.success) return 'success'
      return 'failed'
    })
    .catch((err) => 'error')
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ result: string }>) {
  const { method } = req
  if (method !== 'POST') {
    return res.status(405).json({ result: 'This method is not allowed' })
  }

  const { username, token, type } = req.body
  const { RECAPTCHA_V2_CHECKBOX_SECRET_KEY, RECAPTCHA_V2_HIDDEN_SECRET_KEY } = process.env

  const secretkey =
    type === 'checkbox' ? (RECAPTCHA_V2_CHECKBOX_SECRET_KEY as string) : (RECAPTCHA_V2_HIDDEN_SECRET_KEY as string)

  const result = await verifyRecaptcha({ token, secretkey })

  if (result === 'success') {
    console.log(`mail send ${username}`)
  }

  return res.status(200).json({ result })
}
