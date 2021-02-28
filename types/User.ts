export default interface User {
  _id: string;
  name: string;
  points: number;
  createDate: Date;
  redeemHistory: [];
  __v: number;
}