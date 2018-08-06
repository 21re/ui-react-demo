import * as React from "react";
import { StatelessComponent } from "react";
import { AxiosError } from "axios";
import { Alert } from "reactstrap";

export interface AxiosErrorAlertProps {
  error?: AxiosError
}

export const AxiosErrorAlert: StatelessComponent<AxiosErrorAlertProps> = props => {
  const { error } = props;

  const statusText = error && error.response && error.response.statusText;
  const data = error && error.response && error.response.data;

  if (statusText && data) {
    return (
      <Alert color="danger">
        <p>An error occurred (Reason: {statusText}):</p>
        <p>{JSON.stringify(data)}</p>
      </Alert>
    )
  } else {
    return null;
  }
}
