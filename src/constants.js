export const ICONS = ["fish", "poop", "defend"];
export const SCENES = ["day"];
export const TICK_RATE = 2000;
export const NIGHT_CHANCE = 0.15;
export const getNextHungerTime = (clock) => Math.floor(Math.random() * 3) + 6 + clock;
export const getNextDieTime = (clock) => Math.floor(Math.random() * 3) + 5 + clock;
export const getNextPoopTime = (clock) => Math.floor(Math.random() * 3) + 6 + clock;
export const getNextMonsterTime = (clock) => Math.floor(Math.random() * 3) + 2 + clock;
