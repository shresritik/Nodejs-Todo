export interface ITodo {
  id: number;
  name: string;
  status: STATUS;
}
export enum STATUS {
  INCOMPLETE = "incomplete",
  ONGOING = "ongoing",
  COMPLETE = "complete",
}
