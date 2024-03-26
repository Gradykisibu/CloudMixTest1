import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";

export default function SimpleAlert(props) {

  useEffect(() => {
    const timer = setTimeout(() => {
      props.close()
    }, props.duration); 

    return () => clearTimeout(timer);
  }, [props.message]);

  return (
    <>
    {
      props.open ?
    <Stack sx={{ width: "50%" }} spacing={2}>
        <Alert
          severity={props.type}
          action={
            <Button color="inherit" size="small">
              closes in 5 sec
            </Button>
          }
        >
          {props.message}
        </Alert>
    </Stack>
    :
    <></>
    }
    </>
  );
}
