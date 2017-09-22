const RW = {};

const DEFAULT_HIDE_TIMEOUT = 3500;
const $notifyBar = document.getElementById('notify');
const $notifyInfo = document.getElementById('notifyInfo');
const $notifyError = document.getElementById('notifyError');

let timer = null;
const Notify = {
  show(text, timeout) {
    $notifyInfo.innerHTML = text;
    $notifyInfo.style.display = 'block';
    $notifyError.style.display = 'none';
    this.display(timeout);
  },
  showError(text, timeout) {
    $notifyError.innerHTML = text;
    $notifyError.style.display = 'block';
    $notifyInfo.style.display = 'none';
    this.display(timeout);
  },
  display(timeout) {
    $notifyBar.style.display = 'block';
    if (timer) {
      clearTimeout(timer);
    }
    const self = this;
    timer = setTimeout(() => {
      self.hide();
    }, timeout !== undefined ? timeout : DEFAULT_HIDE_TIMEOUT);
  },
  hide() {
    $notifyInfo.innerHTML = '';
    $notifyError.innerHTML = '';
    $notifyBar.style.display = 'none';
    clearTimeout(timer);
  },
};

RW.Notify = Notify;

window.RW = RW;
export default RW;
