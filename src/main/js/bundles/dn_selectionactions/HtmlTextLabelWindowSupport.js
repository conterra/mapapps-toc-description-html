/*
 * Copyright (C) con terra GmbH
 */
export default function HtmlTextLabelWindowSupport() {
    return {
        showText({text, windowTitle, windowSize}) {
            if (!this._windowManager) {
                return;
            }
            const winSize = windowSize || this._properties._marginBox || {w: 320, h: 520};
            const textLabelWindow = this._windowManager.createWindow({
                title: windowTitle,
                maximizable: true,
                closable: true,
                modal: true,
                marginBox: winSize,
                content: `
                    <div class="ct-toc__text-label-action-window-content padding-default">
                        ${text}
                    </div>
                `,
                windowClass: "ct-toc__text-label-action-window"
            });
            textLabelWindow.show();
        }
    };
}
