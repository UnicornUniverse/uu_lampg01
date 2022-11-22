function getMessageByCode(errorData, errorsLsi) {
  const code = errorData?.error?.code || errorData.code;
  return errorsLsi[code];
}

//@@viewOn:exports
export { getMessageByCode };
export default getMessageByCode;
//@@viewOff:exports
