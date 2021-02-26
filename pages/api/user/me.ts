import { NextApiRequest, NextApiResponse } from 'next'

const me = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

  const headers = {
    Accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDMwM2MwMzdlNzE4NzAwMjBlMzhlZmQiLCJpYXQiOjE2MTM3NzM4Mjd9.Qb8K3EhSfA-dcbcaYx3NmVJmaDHLjzsL7r3HyTY1K0g',
    'Content-type': 'application/json',
  };

  const data = await fetch('https://coding-challenge-api.aerolab.co/user/me', {
    method: 'GET',
    headers: headers,
  }).then(res => res.json());

  res.status(200).send(data)
}

export default me
