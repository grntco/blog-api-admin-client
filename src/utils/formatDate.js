import { format } from "date-fns";

const formatDate = (date) => {
  return format(new Date(date), "PP");
};

export default formatDate;
