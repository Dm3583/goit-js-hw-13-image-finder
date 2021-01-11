import * as basicLightbox from 'basiclightbox';

export default {
    scroll: function () {
        return window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    },

    renderHTML: function (data, template, node) {
        const markup = template(data);
        node.insertAdjacentHTML('beforeend', markup);
    },

    clearHTML: function (element) {
        element.innerHTML = "";
    },

    showBigImg: function (e) {
        if (e.target.tagName !== "IMG") {
            return;
        }
        const instance = basicLightbox.create(`
            <img src=${e.target.dataset.bigImg} width="100%">
        `);
        instance.show();
    },
};