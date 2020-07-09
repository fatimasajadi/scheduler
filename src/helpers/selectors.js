export function getAppointmentsForDay(state, day) {

  let dayArr = [];

  //find the object in our state.days array matching day provided
  const findDay = state.days.find(item => item.name === day)

  //no day is found return the empty arr
  if (!findDay) {
    return dayArr;
  }

  //if there are no appointments return the empty array
  if (findDay.appointments.length === 0) {
    return dayArr;
  }
  //iterate through the day obj-appointment array
  for (const id of findDay.appointments) {
    //push each appointment from state.appointments with the same id as the findDay obj id
    dayArr.push(state.appointments[id]);
  }
  return dayArr;
} 

//getInterview
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  return {
    ...interview,
    interviewer,
  };
}

// STATE

// Given Obj

// {
//   "student": "Lydia Miller-Jones",
//   "interviewer": 1
// }

// Return Obj
// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }


 