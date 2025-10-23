
export interface Project {
  _id?: string;
  title: string;
  description: string;
  status: "active" | "completed";
  createdAt?: string;
  updatedAt?: string;
}
