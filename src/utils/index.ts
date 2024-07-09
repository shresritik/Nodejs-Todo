import { STATUS } from "../enum";
/**
 * checks if the response is in STATUS (complete,incomplete,ongoing)
 * @param response string
 * @returns Boolean
 */
export function isValidStatus(response: string): boolean {
  return Object.values(STATUS).includes(response as STATUS);
}
