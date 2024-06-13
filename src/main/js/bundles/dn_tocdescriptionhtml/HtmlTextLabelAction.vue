<!--

    Copyright (C) 2024 con terra GmbH (info@conterra.de)

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

-->
<template>
    <div class="pa-3 ct-toc__text-label-action">
        <div class="mb-1 grey--text caption">
            {{ label }}:
        </div>
        <div
            v-if="labelToLong"
            class="grey--text caption">
            <a
                v-if="showLabelMore()"
                href="javascript:void(0)"
                @click="triggerAction"
            >
                {{ labelMore }}
            </a>
        </div>
        <div
            v-else
            class="grey--text caption"
            v-html="labelValue">
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            item: {
                type: Object,
                default: undefined
            }
        },
        data() {
            return {
                action() {
                    return {};
                }
            };
        },
        computed: {
            label() {
                return this.action().label;
            },

            labelMore() {
                return this.action().labelMore;
            },

            threshold() {
                const defaultThreshold = 120;
                return this.action().truncationThreshold || defaultThreshold;
            },

            labelValue() {
                return this.action().valueOf(this.item);
            },

            labelToLong() {
                return !!(this.showLabelMore() && this.threshold >= 0);
            }
        },
        methods: {
            showLabelMore() {
                return this.threshold >= 0 && this.labelMore
                    && this.labelValue && this.labelValue.length > this.threshold;
            },

            triggerAction() {
                this.$emit("close-menu");
                this.action().trigger(this.item);
            }
        }
    };
</script>
