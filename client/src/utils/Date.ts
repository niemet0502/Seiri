const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const addZero = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

export const getHours = (date?: Date, separator = ":") => {
  if (!date) return;
  const d = new Date(date);
  return `${addZero(d.getHours())}${separator}${addZero(d.getMinutes())}`;
};

export const transformDate = (dateStr?: Date, hours = false) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return `${addZero(date.getDate())}/${addZero(
    date.getMonth() + 1
  )}/${date.getFullYear()} ${hours ? getHours(date) : ""}`;
};

export const MINUTE = 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
export const MONTH = DAY * 30;

export const getIntervalFromDate = (dateStr?: Date) => {
  if (!dateStr) return 0;

  const date = new Date(dateStr);

  return (Date.now() - date.getTime()) / 1000;
};

export const transformDateToYYYMMDDFormat = (dateStr?: Date) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(
    date.getDate()
  )}`;
};

export const getIntervalStringFromDate = (dateStr?: Date) => {
  if (!dateStr) return "";

  const interval = getIntervalFromDate(dateStr);

  if (interval < MINUTE) return `now`;
  if (interval < HOUR) return `${Math.round(interval / MINUTE)} minutes ago`;
  if (interval < DAY) return `${Math.round(interval / HOUR)} hours ago`;
  if (interval < MONTH) return `${Math.round(interval / DAY)} days ago`;

  return `since ${Math.round(interval / MONTH)} months`;
};

export const displayDuedate = (dateStr?: Date) => {
  if (!dateStr) return {};

  const date = new Date(dateStr);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (date.getTime() === currentDate.getTime()) {
    return { status: "today", label: "Today" };
  }
  currentDate.setDate(currentDate.getDate() + 1);

  if (date.getTime() === currentDate.getTime()) {
    return { status: "tmr", label: "Tomorrow" };
  }

  if (date.getTime() > currentDate.getTime()) {
    return {
      status: "next",
      label: `${months[date.getMonth()]} ${date.getDate()}`,
    };
  }

  return {
    status: "due",
    label: `${months[date.getMonth()]} ${date.getDate()}`,
  };
};
