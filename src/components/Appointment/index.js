import "components/Appointment/styles.scss";
import Header from "components/Appointment/header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/empty";
import useVisualMode from "../../hooks/useVisualMode.js"
import React from "react";
import Form from "components/Appointment/form";
import Confirm from "components/Appointment/confirm";
import Error from "components/Appointment/error";
import Status from "components/Appointment/status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const SAVING = "SAVING";
const CONFIRM = 'CONFIRM';
const DELETING = 'DELETING';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR';
const ERROR_DELETE = "ERROR";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function deleteInterview() {
    transition(DELETING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }
  return (
    <>
      <Header time={props.time} />
      <div className="appointment">
        {mode === SAVING && <Status message={'Saving'} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === CREATE && <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />}
        {mode === EDIT && <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save} onCancel={() => back()}
        />}

        {mode === CONFIRM && <Confirm
          message={'Are you sure you want to cancel?'}
          onCancel={() => back()}
          onConfirm={deleteInterview}
        />}

        {mode === DELETING && <Status
          message="Deleting"
        />}
        {mode === ERROR_SAVE && <Error message="oops and error occurred while saving"
          onClose={back}
        />}
        {mode === ERROR_DELETE && <Error message="oops and error occurred while deleting"
          onClose={back}
        />}

      </div>
    </>
  );
}

