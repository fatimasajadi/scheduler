import "components/Appointment/styles.scss";
import Header from "components/Appointment/header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/empty";
import useVisualMode from "../../hooks/useVisualMode.js"
import React from "react";
import Form from "components/Appointment/form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <>
      <Header time={props.time} />
      <div className="appointment">
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === CREATE && <Form
          interviewers={props.interviewers}
          onSave={() => transition(SAVE)} 
          onCancel={() => back()}
        />}
      </div>
    </>
  );

}

