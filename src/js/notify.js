import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
// PNotify.alert({ text: "hello" }).close();

export default {

    error: function(message) {
        return PNotify.error({
            text: message,
            closer: true,
            delay: 4000,
            shadow: true
        });

    },




    // PNotify.success(options);

    // PNotify.info(options);

    // PNotify.error(options);

    // PNotify.alert(options);
}