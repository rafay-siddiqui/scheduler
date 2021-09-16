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

export function getInterviewersForDay(state, day) {
  let dayInterviewers = [];
  for (const obj in state.days) {
    if (state.days[obj].name === day) {
      dayInterviewers = state.days[obj].interviewers
    }
  }

  let interviewersArr = [];
  dayInterviewers.forEach((interview) => {
    interviewersArr.push(state.interviewers[interview]);
  })

  if (interviewersArr.length === 0) {
    return [];
  } else {
    return interviewersArr;
  }
};