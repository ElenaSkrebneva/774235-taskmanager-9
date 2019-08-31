export const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + Math.floor((Math.random() * 2 - 1) * 7 * 24 * 3600000),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `pink`,
    `green`
  ][Math.floor(Math.random() * 5)],
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`
  ]),
  repeatingDays: {
    'mon': Boolean(Math.round(Math.random() * 0.7)),
    'tue': Boolean(Math.round(Math.random() * 0.7)),
    'wed': Boolean(Math.round(Math.random() * 0.7)),
    'thu': Boolean(Math.round(Math.random() * 0.7)),
    'fri': Boolean(Math.round(Math.random() * 0.7)),
    'sat': Boolean(Math.round(Math.random() * 0.7)),
    'sun': Boolean(Math.round(Math.random() * 0.7))
  },
  isFavorite: Boolean(Math.round(Math.random())),
  isArchived: Boolean(Math.round(Math.random()))
});