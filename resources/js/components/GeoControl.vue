<template>
    <v-card>
        <v-card-title>
            <h2>Даннные по запросам</h2>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Поиск..."
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="geoInfo"
            :search="search"
            hide-actions
            must-sort
        >
            <template slot="items" slot-scope="props">
                <tr>
                    <template v-for="header in headers">
                        <td v-if="!!header.value" :key="header.value" class="text-xs-center">
                            {{ props.item[[header.value]] }}
                        </td>
                        <td v-else :key="header.value" class="px-0 text-xs-center">
                            <v-btn
                                icon
                                small
                                color="accent"
                                :to="{ name: 'geoControlEdit', params: { id: props.item.id } }"
                            >
                                <v-icon small color="yellow">
                                    edit
                                </v-icon>
                            </v-btn>
                            <v-btn
                                icon
                                small
                                color="accent"
                                @click="removeItem(props.item)"
                            >
                                <v-icon small color="red">
                                    delete
                                </v-icon>
                            </v-btn>
                        </td>
                    </template>
                </tr>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning" outline>
                Поиск по запросу "{{ search }}" не дал результатов.
            </v-alert>
            <v-alert slot="no-data" :value="true" color="warning" icon="warning" outline>
                Данных пока нет
            </v-alert>
        </v-data-table>
    </v-card>
</template>

<script>
    import storage from '../store/storage';

    export default {
        data: () => ({
            search: '',
            headers: [
                {
                    text: 'Запрос',
                    align: 'center',
                    sortable: false,
                    value: 'request',
                },
                {
                    text: 'Дата создания',
                    align: 'center',
                    value: 'created_at',
                },
                {
                    text: 'Дата редактирования',
                    align: 'center',
                    value: 'updated_at',
                },
                {
                    text: 'Управление',
                    align: 'center',
                    sortable: false
                }
            ],
        }),
        computed: {
            geoInfo: function () {
                return storage.getters['geoInfo'];
            },
            userName: function () {
                return storage.getters['userName'];
            }
        },
        methods: {
            removeItem: function (item) {
                if (confirm(`Вы действительно хотите удалить информацию о запросе?`)) {
                    storage.dispatch('removeGeoInfo', item);
                }
            }
        },
        created: function () {
            storage.dispatch('getGeoInfo');
        },
        beforeRouteEnter: function (to, from, next) {
            if (to.params.id) {
                next(`/geo-control/${to.params.id}`);
            }

            next();
        }
    }
</script>