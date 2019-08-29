export const getTask = () => ({
    description: [
      `Prepare for the pitch`,
      `Find money for travel`,
      `Eat something`,
      `Drink something`
    ][Math.floor(Math.random() * 4)],
    dueDate: Date.now() + 1 + Math.floor(Math.random() * 7 * 24 * 3600000),
    color: [
      `black`,
      `yellow`,
      `blue`,
      `pink`,
      `green`
    ][Math.floor(Math.random() * 5)],
    tags: new Set([
      `cinema`,
      `entertainment`,
      `myself`
    ]),
    repeatingDays: {
      mon: false,
      tue: false,
      wed: false,
      thu: Boolean(Math.round(Math.random())),
      fri: false,
      sat: false,
      sun: false
    }
});
