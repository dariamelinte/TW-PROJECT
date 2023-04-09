import { entryTypes } from "/frontend/utils/selectsOptions.js";

import SleepEntry from "./sleepEntry.js";
import FoodEntry from "./foodEntry.js";

export default function Entry ({ entryType, ...props}) {
  let entry;

  switch (entryType) {
    case entryTypes.sleep:
      entry = SleepEntry(props);
      break;
    case entryTypes.food:
      entry = FoodEntry(props);
      break;
    default:
      break;
  }

  return entry;
}