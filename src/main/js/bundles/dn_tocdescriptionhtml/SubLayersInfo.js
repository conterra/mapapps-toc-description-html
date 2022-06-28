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
import { declare } from "apprt-core/Mutable";
import Promise from "apprt-core/Promise";
import request from "apprt-request";
import Extent from "esri/geometry/Extent";
import deprecate from "apprt-core/deprecate";

const _loadingPromise = Symbol("_loading");
const _infos = Symbol("_infos");

/** @type {any} */
const SubLayersInfo = declare({
    url: {
        type: String
    },

    loading: false,
    loaded: false,

    [_infos]: {},
    [_loadingPromise]: undefined,

    getIds() {
        return Object.keys(this[_infos]).map(Number);
    },

    getById(id) {
        return this[_infos][id];
    },

    load() {
        deprecate("map-widget/SubLayersInfo load", "Use Sublayer.load() or loadAll() on the parent layer instead.");

        if (this.loaded) {
            return Promise.resolve(this);
        }
        if (this[_loadingPromise]) {
            return this[_loadingPromise];
        }

        const metadata = loadAllLayersMetadata(this.url);
        this.loading = true;
        this[_loadingPromise] = metadata.then((metadataLookup) => {
            const keys = Object.keys(metadataLookup);
            const infos = this[_infos];
            for (const id of keys) {
                infos[id] = new SubLayerInfo(metadataLookup[id]);
            }
            return this;
        }).finally(() => {
            this[_loadingPromise] = undefined;
            this.loading = false;
            this.loaded = true;
        });

        return this[_loadingPromise];
    }
});

export default SubLayersInfo;

export function findInfoOfSubLayer(subLayer) {
    const sublayersInfo = findSubLayerInfos(subLayer);
    if (!sublayersInfo || !sublayersInfo.loaded) {
        return undefined;
    }
    return sublayersInfo.getById(subLayer.id);
}

export function findSubLayerInfos(sublayerOrLayer) {
    if (!sublayerOrLayer) {
        return undefined;
    }
    const parent = sublayerOrLayer.layer || sublayerOrLayer;
    return parent && parent.sublayersInfo;
}

const SubLayerInfo = declare({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    fields: [],
    displayField: {
        type: String
    },
    objectKeyField: {
        type: String
    },
    extent: {
        type: Extent
    }
});

function loadAllLayersMetadata(mapServerBaseUrl) {
    const url = mapServerBaseUrl + "/layers";
    return fetch(url).then((metadata) => {
        const index = {};
        putById(index, metadata.layers);
        putById(index, metadata.tables);
        return index;
    });
}

function putById(target, items) {
    for (const item of items) {
        target[item.id] = item;
    }
}

function fetch(url) {
    return Promise.wrap(request(url, {
        query: {
            f: "json"
        }
    }));
}
