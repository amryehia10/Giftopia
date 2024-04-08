type RegUser = {
  name: string;
  email: string;
  password: string;
  gender: string;
  age: number | null;
  profileImage: File | null;
  phone: { number: string }[];
  address: { address: string }[];
};
