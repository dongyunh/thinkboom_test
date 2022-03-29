import { toast } from 'react-toastify';

const copyUrlHelper = () => {
  const el = document.createElement('input');
  el.value = window.location.href;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  toast.info('URL이 복사되었습니다. 동료에게 공유하세요');
};

export default copyUrlHelper;
