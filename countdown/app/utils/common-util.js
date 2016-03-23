export default {

  now: Date.now || (() => (
    (new Date()).getTime()
  ))
};
