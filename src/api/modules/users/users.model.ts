export type UserRole = "Creator" | "Brand" | "Agency" | "Admin";

export type SubscriptionStatus = "Free" | "Basic" | "Pro" | "Inactive";

export type User = {
  id: string;
  email: string;

  name: string;
  profilePictureUrl: string | null;

  role: UserRole;
  subscriptionEndDate: Date | null;

  creationDate: Date;
  lastLogin: Date | null;
  niche: string | null;
  companyName: string | null;
};

export type NewUser = Pick<User, "email" | "name" | "role"> & {
  password: string;
  profilePictureUrl?: string;
};
export type UserCreationData = Omit<NewUser, "password">;
export type UpdateUser = Partial<Omit<User, "id" | "creationDate">>;
