// Переделай алгоритм поиска на регулярные выражения, чтобы можно было искать любую последовательность введенных слов
const doFilterData = (arr, word, durationTogl) => {
  const keyWord = word.toLowerCase();
  return arr.filter((movie) =>
    durationTogl
      ? (movie.nameRU.toLowerCase().includes(keyWord) ||
          movie.nameEN.toLowerCase().includes(keyWord)) &&
        movie.duration < 41
      : movie.nameRU.toLowerCase().includes(keyWord) ||
        movie.nameEN.toLowerCase().includes(keyWord)
  );
};

export default doFilterData;
