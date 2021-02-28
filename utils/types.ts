export interface HistoryItemType {
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
  qty: number;
}

export interface HistoryItemRawType {
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

export interface ProductType {
  img: {
    url: string;
    hdUrl: string;
  };
  _id: string;
  name: string;
  cost: number;
  category: string;
}

export interface UserType {
  _id: string;
  name: string;
  points: number;
  createDate: Date;
  redeemHistory: [];
  __v: number;
}