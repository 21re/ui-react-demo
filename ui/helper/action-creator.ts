
/**
 * @export Action Creator helper factory function
 * @class ActionCreator
 * @template T - Generic Type
 * @template P - Generic Type
 */
export class ActionCreator<T, P> {
  readonly type: T;
  readonly payload: P;

  constructor(type: T) { this.type = type; }
  create = (payload: P) => ({ type: this.type, payload });
}
