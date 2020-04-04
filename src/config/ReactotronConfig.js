import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

function desenv() {
  return process.env.NODE_ENV === 'development';
}

if (desenv()) {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();
  tron.clear();
  console.tron = tron;
}
