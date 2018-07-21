import plans from "./plans.json";

export const getPlan = level => {
  const plan = plans.find(training => training.level === level);
  return plan ? plan : null;
};

export const getTraining = (level, day) => {
  const plan = getPlan(level);
  return plan ? plan.trainings[day] : null;
};

export const getLevels = () => plans.map(plan => plan.level);
