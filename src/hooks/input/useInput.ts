import { ChangeEvent, useReducer } from "react";
import { ValidatorFn } from "../../shared/utils/validate/models/ValidatorFn";
import { Action } from "./models/Action.interface";
import {
  InputTypeAction,
  INPUT_ACTION_BLUR,
  INPUT_ACTION_CHANGE,
  INPUT_ACTION_CLEAR,
} from "./models/InputAction";
import { InputState } from "./models/inputState.interface";

const initialInputState: InputState = {
  text: "",
  hasBeenTouch: false,
};

const inputReducer = (state: InputState, action: Action<InputTypeAction>) => {
  const { type, payload = "" } = action;
  switch (type) {
    case INPUT_ACTION_CHANGE:
      return {
        text: payload,
        hasBeenTouch: state.hasBeenTouch,
      };

    case INPUT_ACTION_BLUR:
      return {
        text: state.text,
        hasBeenTouch: true,
      };

    case INPUT_ACTION_CLEAR:
      return {
        text: "",
        hasBeenTouch: false,
      };
  }
};

export const useInput = (validatorFn?: ValidatorFn) => {
  const [{ text, hasBeenTouch }, dispatch] = useReducer(
    inputReducer,
    initialInputState
  );

  let shouldDisplayError;
  if (validatorFn) {
    const isValid = validatorFn(text);
    shouldDisplayError = !isValid && hasBeenTouch;
  }

  const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: INPUT_ACTION_CHANGE, payload: e.target.value });
  };

  const blurChangeHandler = () => {
    dispatch({ type: INPUT_ACTION_BLUR });
  };

  const clearChangeHandler = () => {
    dispatch({ type: INPUT_ACTION_CLEAR });
  };

  return {
    text,
    textChangeHandler,
    blurChangeHandler,
    clearChangeHandler,
    shouldDisplayError,
  };
};
