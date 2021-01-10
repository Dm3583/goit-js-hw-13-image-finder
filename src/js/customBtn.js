export default class Button {
    constructor({ selector, hidden = false, messOnInit, messOnStateChange }) {
        this.refs = this.getRefs(selector);
        this.messOnInit = messOnInit;
        this.messOnStateChange = messOnStateChange;

        hidden && this.hide();
    };

    getRefs(selector) {
        const refs = {};
        refs.button = document.querySelector(selector);
        refs.label = refs.button.querySelector('.label');
        // refs.label.textContent = this.messOnInit;
        // console.log(text);

        return refs;
    };

    enable() {
        this.refs.button.disabled = false;
        this.refs.label.textContent = this.messOnInit;
        // console.log("enable");
    };

    disable() {
        this.refs.button.disabled = true;
        this.refs.label.textContent = this.messOnStateChange;
        // console.log("disabled");
    };

    show() {
        this.refs.button.classList.remove('is-hidden');
    };

    hide() {
        this.refs.button.classList.add('is-hidden');
    };

}