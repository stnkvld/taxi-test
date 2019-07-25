<template>
    <v-app>
        <v-toolbar
            app
            fixed
            flat
            color="primary"
            dark
            class="pl-0"
        >
            <v-toolbar-title>Сервис подсказок адресов</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                    text
                    flat
                    v-for="item in menuItems"
                    :to="item.link"
                    :key="item.link.name"
                    v-if="item.auth === 'both' || item.auth === isAuth"
                >
                    {{ item.label }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
    import storage from '../store/storage';

    export default {
        data: () => ({
            menuItems: [
                {
                    label: 'Поиск адреса',
                    link: {
                        name: 'tips'
                    },
                    auth: 'both'
                },
                {
                    label: 'Вход',
                    link: {
                        name: 'login'
                    },
                    auth: false
                },
                {
                    label: 'Регистрация',
                    link: {
                        name: 'registration'
                    },
                    auth: false
                },
                {
                    label: 'Управление',
                    link: {
                        name: 'geoControl'
                    },
                    auth: true
                },
                {
                    label: 'Выход',
                    link: {
                        name: 'logout'
                    },
                    auth: true
                }
            ]
        }),
        computed: {
            isAuth: function () {
                return storage.getters['isAuth'];
            }
        },
        created: async function () {
            await storage.dispatch('autoLogin').then(() => {
                if (storage.getters['isAuth']) {
                    this.$router.push('/geo-control')
                }
            });
        }
    }
</script>