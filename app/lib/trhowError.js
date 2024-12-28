import { httpState } from "../../config/config";

export default function throwError({
  errorMsg = httpState.notImplemented.string,
  errorCode = httpState.notImplemented.number,
}) {
  const error = new Error(errorMsg);
  error.code = errorCode;
  throw error;
}
