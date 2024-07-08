import { STATUS } from "../interface/todo";

export function isValidStatus(response: string): response is STATUS {
  return Object.values(STATUS).includes(response as STATUS);
}
