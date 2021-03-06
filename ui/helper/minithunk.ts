import { Dispatch } from "react-redux";

export type BindableActions<S, T> = {
  [name in keyof T]: (dispatch: Dispatch<S>) => T[name]
};

export function bindBindableActions<S, T extends { [name: string]: (...args: any[]) => void }>(dispatch: Dispatch<S>, actions: BindableActions<S, T>): T {
  const result = {} as T;
  for (const actionName in actions) {
    const stringActionName: string = actionName
    if (actions.hasOwnProperty(actionName)) {
      result[stringActionName] = (...args: any[]) => actions[actionName](dispatch)(...args);
    }
  }
  return result;
}
