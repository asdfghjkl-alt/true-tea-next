export interface LoginFormData {
  email: string;
  password: string;
}

export enum AgeRange {
  Under20 = "<20",
  TwentyTo29 = "20-29",
  ThirtyTo39 = "30-39",
  FortyTo49 = "40-49",
  FiftyTo59 = "50-59",
  SixtyTo69 = "60-69",
  SeventyPlus = "≥70",
}

export enum Membership {
  Member = "member",
  Friend = "friend",
  VIP = "vip",
}

export interface RegisterFormData extends LoginFormData {
  fname: string;
  lname: string;
  phone: string;
  age: AgeRange;
  postcode: string;
  confirmPassword?: string;
}
