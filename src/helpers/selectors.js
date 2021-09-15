export function getAppointmentsForDay(state, day) {
  let dayAppointments = [];
  for (const obj in state.days) {
    if (state.days[obj].name === day) {
      dayAppointments = state.days[obj].appointments
    }
  }

  let appointmentArr = [];
  dayAppointments.forEach((appointment) => {
    appointmentArr.push(state.appointments[appointment]);
  })

  if (appointmentArr.length === 0) {
    return [];
  } else {
    return appointmentArr;
  }
};

export function getInterview(state, interview) {
    if (interview) {
      interview.interviewer = state.interviewers[interview.interviewer]
    }
  return interview;
};