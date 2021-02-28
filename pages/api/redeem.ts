import { NextApiRequest, NextApiResponse } from 'next'

const redeem = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

  const headers = {
    Accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDMwM2MwMzdlNzE4NzAwMjBlMzhlZmQiLCJpYXQiOjE2MTM3NzM4Mjd9.Qb8K3EhSfA-dcbcaYx3NmVJmaDHLjzsL7r3HyTY1K0g',
    'Content-type': 'application/json',
  };

  const { productId } = req.body

  if (productId.length !== 24) return res.status(400).end()

  await fetch('https://coding-challenge-api.aerolab.co/redeem', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ productId: productId })
  })

  res.status(200).end()

}

export default redeem
