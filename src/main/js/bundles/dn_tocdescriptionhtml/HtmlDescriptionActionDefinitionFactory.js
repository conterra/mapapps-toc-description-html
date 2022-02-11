/*
 * Copyright (C) 2020 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {findInfoOfSubLayer, findSubLayerInfos } from "map-widget/SubLayersInfo";

const ID = "show-html-description";

export default class HtmlDescriptionActionDefinitionFactory {
    constructor(props) {
        this.supportedIds = [ID];
        this._marginBox = props && props.marginBox;
        this._truncationThreshold = props && props.truncationThreshold;
    }

    createDefinitionById(id) {
        if (ID !== id) {
            return;
        }
        const i18n = this._i18n.get().ui;
        const labelWin = this._textLabelWindow;
        const winSize = this._marginBox;

        return {
            id: ID,
            type: "html-text-label",
            label: i18n.description,
            labelMore: i18n.labelMore,
            truncationThreshold: this._truncationThreshold,

            isVisibleForItem(tocItem) {
                const hasDescription = isValidDescription(this.valueOf(tocItem));
                if (!hasDescription && tocItem.type === "sublayer") {
                    const infos = findSubLayerInfos(tocItem.ref);
                    if (infos && !infos.loaded) {
                        return infos.load().then(() => isValidDescription(this.valueOf(tocItem)));
                    }
                }
                return hasDescription;
            },

            valueOf(tocItem) {
                const itemDescription = tocItem.ref.description;
                if (itemDescription) {
                    return itemDescription;
                }

                const metadata = findInfoOfSubLayer(tocItem.ref);
                if (!metadata) {
                    return undefined;
                }
                return metadata.description;
            },

            trigger(tocItem) {
                labelWin.showText({
                    text: tocItem.ref.description,
                    windowTitle: i18n.description,
                    windowSize: winSize
                });
            }
        };
    }
}

function isValidDescription(val) {
    return val && val.toLowerCase() !== "none";
}
