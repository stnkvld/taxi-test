<template>
    <v-form v-model="valid">
        <v-layout wrap>
            <v-flex
                xs12
                md4
                offset-md4
            >
                <v-autocomplete
                    v-model="address"
                    :items="addressList"
                    item-text="name"
                    item-value="id"
                    :search-input.sync="search"
                    :loading="isLoading"
                    solo
                    hide-details
                    label="Поиск адреса..."
                    no-data-text="Данные отсутствуют"
                >
                </v-autocomplete>
            </v-flex>
        </v-layout>
    </v-form>
</template>

<script>
    import { debounce } from 'lodash';
    import storage from "../store/storage";

    export default {
        data: () => ({
            valid: false,
            address: '',
            search: null
        }),
        computed: {
            isLoading: function () {
                return storage.getters['isAxiosLoading'];
            },
            addressList: function () {
                return storage.getters['tips'];
            }
        },
        watch: {
            search: _.debounce(async function(address) {
                if (address && address.length > 2) {
                    await storage.dispatch('getTips', address);
                }
            }, 500)
        }
    }
</script>