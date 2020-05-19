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
