export default interface HistoryItemRaw {
  img: {
    url: string;
    hdUrl: string;
  };
  createDate: string;
  _id: string;
  name: string;
  cost: number;
  category: string;
  productId: string;
}