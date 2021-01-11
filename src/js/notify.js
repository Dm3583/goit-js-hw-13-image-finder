import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';

PNotify.defaults.delay = 5000;
PNotify.defaults.shadow = true;

export default {

    message: function (text, type) {
        return PNotify[type]({
            text: text,
        });
    },
    // types: [success, info, error, alert]
    // PNotify.success(options);PNotify.info(options);PNotify.error(options);PNotify.alert(options);

    close: function () {
        const closeNotifyBtn = document.querySelectorAll('.ui-pnotify-closer');
        if (closeNotifyBtn) {
            closeNotifyBtn.forEach(e => e.click());
        };
    },
};