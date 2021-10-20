//Function serves to fill up the arrays for a day's appointments and interviewers
function getElementsForDay(state, day, component) {
  let dayElements = [];
  for (const obj in state.days) {
    if (state.days[obj].name === day) {
      dayElements = state.days[obj][component]
    }
  }

  let elementsArr = [];
  dayElements.forEach((element) => {
    elementsArr.push(state[component][element]);
  })

  if (elementsArr.length === 0) {
    return [];
  } else {
    return elementsArr;
  }
}

export function getAppointmentsForDay(state, day) {

  return getElementsForDay(state, day, "appointments")

};

export function getInterview(state, interview) {
  //Avoid undefined error by adding condition for selected interviewer
  if (interview && typeof interview.interviewer === 'number') {
    interview.interviewer = state.interviewers[interview.interviewer]
  }
  return interview;
};

export function getInterviewersForDay(state, day) {

  return getElementsForDay(state, day, "interviewers")

};