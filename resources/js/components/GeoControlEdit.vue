<template>
    <v-layout column align-center>
        <v-card>
            <v-alert
                :value="error"
                type="error"
                mode="in-out"
            >
                {{ error }}
            </v-alert>
            <v-card-title>
                <h2>Редактирование информации о запросе</h2>
            </v-card-title>
            <v-card-text>
                <v-form
                    ref="editForm"
                    v-model="valid"
                    class="edit-form"
                    v-if="editingGeoInfo"
                    @submit.prevent="edit"
                >
                    <v-textarea
                        v-model="editingGeoInfo.request"
                        outlined
                        label="Запрос"
                    ></v-textarea>

                    <v-textarea
                        v-model="editingGeoInfo.response"
                        outlined
                        label="Ответ"
                    ></v-textarea>

                    <v-btn
                        :disabled="!valid"
                        color="success"
                        type="submit"
                        @click="validate"
                        class="edit-form__btn"
                    >
                        Сохранить
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<style scoped>
    .edit-form {
        width: 500px;
    }

    .edit-form__btn {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>

<script>
    import storage from '../store/storage';

    export default {
        data: () => ({
            valid: false
        }),
        computed: {
            error: function () {
                return storage.getters['error'];
            },
            editingGeoInfo: function () {
                return storage.getters['editingGeoInfo'];
            }
        },
        methods: {
            validate: function () {
                this.valid = !!this.$refs.editForm.validate();
            },
            edit: async function () {
                if (this.valid) {
                    await storage.dispatch('editGeoInfo', this.editingGeoInfo);
                }
            }
        },
        created: function() {
            storage.dispatch('setEditingGeoInfoIdx', this.$route.params.id);
        }
    }
</script>