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
                <h2>Авторизация</h2>
            </v-card-title>
            <v-card-text>
                <v-form
                    ref="loginForm"
                    v-model="valid"
                    class="login-form"
                    @submit.prevent="login"
                >
                    <v-text-field
                        v-model="email"
                        :rules="[rules.required]"
                        label="E-mail"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        :rules="[rules.required]"
                        type="password"
                        label="Пароль"
                        required
                    />

                    <v-btn
                        :disabled="!valid"
                        color="success"
                        type="submit"
                        @click="validate"
                        class="login-form__btn"
                    >
                        Войти
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<style scoped>
    .login-form {
        width: 500px;
    }

    .login-form__btn {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>

<script>
    import storage from '../store/storage';

    export default {
        data: () => ({
            valid: false,
            email: '',
            password: '',
            rules: {
                required: value => !!value || 'Заполните обязательное поле'
            }
        }),
        computed: {
            error: function () {
                return storage.getters['error'];
            }
        },
        methods: {
            validate: function () {
                this.valid = !!this.$refs.loginForm.validate();
            },
            login: async function () {
                if (this.valid) {
                    await storage.dispatch('login', {
                        email: this.email,
                        password: this.password
                    }).then(response => {
                        if (storage.getters['isAuth']) {
                            this.$router.push('/geo-control');
                        }
                    });
                }
            }
        },
    }
</script>