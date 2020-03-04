export const formatDate = date => {
  let day = date.getDate();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (day.toString().length === 1) {
    day = `0${day}`;
  }

  if (month.toString().length === 1) {
    month = `0${month}`;
  }

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} GMT`;
};
