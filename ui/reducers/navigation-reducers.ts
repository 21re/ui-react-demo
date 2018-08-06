import { NavigationState } from "./state";
import { INITIAL_STATE } from "./reducers";
import { NavigationAction, NavigationActionCreators } from "../actions/navigation";
import { router } from "../router";

export function navigationReducer(state: NavigationState = INITIAL_STATE.navigation, action: NavigationAction): NavigationState {
  switch (action.type) {
    case NavigationActionCreators.navigateTo.type:
      router.pushHistory(action.payload.name, action.payload.params);

      return {
        ...state,
        currentPage: action.payload.name,
      };

    default:
      return state;
  }
}
