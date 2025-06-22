export const addDynamicDates = (tours) => {
  const today = new Date();

  return tours.map((tour) => {
    const offsetDays = Number(tour.offsetDays);

    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() + offsetDays);

    const duration = Number(tour.duration);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);

    return {
      ...(typeof tour.toObject === 'function' ? tour.toObject() : tour),
      startDate,
      endDate,
    };
  });
};
