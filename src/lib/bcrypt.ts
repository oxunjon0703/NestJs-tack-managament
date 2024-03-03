import * as heshla from 'bcrypt';

export const hashed = (data: string): Promise<string> => {
  const salt: number = 10;

  return heshla.hash(data, salt);
};

export const compar = (data: string, hashData: string): Promise<boolean> => {
  return heshla.compare(data, hashData);
};
