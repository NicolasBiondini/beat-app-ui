export type finalDate = {
  finalDay: string;
  finalHour: string;
};

export const transformDate = (date: number) => {
  let day = new Date(Number(date)).getDate();
  let month = new Date(Number(date)).getMonth() + 1;
  let year = new Date(Number(date)).getFullYear();
  let hours = new Date(Number(date)).getHours();
  let minutes = new Date(Number(date)).getMinutes();

  let finalDate = {
    finalDay: `${addZeros(day)}/${addZeros(month)}/${year}`,
    finalHour: `${addZeros(hours)}:${addZeros(minutes)}`,
  };

  return finalDate;
};

const addZeros = (date: number) => {
  if (date < 10) {
    return `0${date}`;
  }
  return date;
};
