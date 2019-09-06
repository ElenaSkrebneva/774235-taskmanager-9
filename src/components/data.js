const tagsAr = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

const descriptionAr = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const colorAr = [
  `black`,
  `yellow`,
  `blue`,
  `pink`,
  `green`
];

const getTags = () => {
  let num = Math.floor(Math.random() * 3);
  const tagsSet = new Set();
  for (let i = 0; i <= num; i++) {
    tagsSet.add(tagsAr[Math.floor(Math.random() * tagsAr.length)]);
  }
  return tagsSet;
};

export const getTask = () => ({
  description: descriptionAr[Math.floor(Math.random() * 3)],
  dueDate: Date.now() + Math.floor((Math.random() * 2 - 1) * 7 * 24 * 3600000),
  color: colorAr[Math.floor(Math.random() * 5)],
  tags: getTags(),
  repeatingDays: {
    mon: Boolean(Math.round(Math.random() * 0.55)),
    tue: Boolean(Math.round(Math.random() * 0.55)),
    wed: Boolean(Math.round(Math.random() * 0.55)),
    thu: Boolean(Math.round(Math.random() * 0.55)),
    fri: Boolean(Math.round(Math.random() * 0.55)),
    sat: Boolean(Math.round(Math.random() * 0.55)),
    sun: Boolean(Math.round(Math.random() * 0.55))
  },
  isFavorite: Boolean(Math.round(Math.random())),
  isArchived: Boolean(Math.round(Math.random()))
});
