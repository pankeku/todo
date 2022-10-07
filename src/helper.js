import { formatDistanceToNow, isBefore, parseISO } from "date-fns";

function dueDateChecker(date) {
  date = parseISO(date);

  if (date == "Invalid Date") return;
  let result = formatDistanceToNow(date);

  let status = isBefore(date, new Date())
    ? `${result} overdue`
    : `due in ${result}`;

  return status;
}

export {dueDateChecker};
