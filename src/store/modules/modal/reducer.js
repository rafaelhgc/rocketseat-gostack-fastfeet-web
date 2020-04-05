import produce from 'immer';

const INITIAL_STATE = {
  visible: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@modal/TOOGLE':
        draft.visible = action.payload.visibility;
        break;
      default:
    }
  });
}
