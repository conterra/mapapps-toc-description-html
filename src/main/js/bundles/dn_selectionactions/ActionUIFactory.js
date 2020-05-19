import TextLabelAction from "./HtmlTextLabelAction.vue";

export default class ActionUIFactory {
    createUIFor(actionDef) {
        const vueClazz = typeToVueClazz(actionDef.type);
        if (!vueClazz) {
            return undefined;
        }
        return {
            extends: vueClazz,
            data() {
                return {
                    // use function to shield action definition
                    // to be walked/observed by Vue
                    action() {
                        return actionDef;
                    }
                };
            }
        };
    }
}

function typeToVueClazz(type) {
    switch (type) {
        case "html-text-label":
            return TextLabelAction;
        default:
            return undefined;
    }
}
