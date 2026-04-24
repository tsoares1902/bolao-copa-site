export type StadiumMidia = {
  photoUrl: string;
};

export type Stadium = {
  _id: string;
  name: string;
  city: string;
  capacity?: number;
  midia: StadiumMidia;
};
