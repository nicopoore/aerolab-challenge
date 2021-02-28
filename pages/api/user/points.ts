import { NextApiRequest, NextApiResponse } from 'next'

const points = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

  const headers = {
    Accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDMwM2MwMzdlNzE4NzAwMjBlMzhlZmQiLCJpYXQiOjE2MTM3NzM4Mjd9.Qb8K3EhSfA-dcbcaYx3NmVJmaDHLjzsL7r3HyTY1K0g',
    'Content-type': 'application/json',
  };

  const { amount } = req.body

  console.log(amount === 5000)
  if (amount !== (1000 || 5000 || 7500)) return res.status(503).end()

  await fetch('https://coding-challenge-api.aerolab.co/user/points', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ amount: amount })
  }).then(res => res.json())
    .then(res => res.status(200).end())

}

export default points
