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
                <h2>Регистрация</h2>
            </v-card-title>
            <v-card-text>
                <v-form
                    ref="regForm"
                    v-model="valid"
                    class="reg-form"
                    @submit.prevent="register"
                >
                    <v-text-field
                        v-model="name"
                        :rules="[rules.required]"
                        label="Имя"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="email"
                        :rules="[rules.required, rules.emailMatch]"
                        label="E-mail"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        :rules="[rules.required, rules.passwordMinChars]"
                        type="password"
                        label="Пароль"
                        required
                    />

                    <v-text-field
                        v-model="passwordConfirm"
                        :rules="[rules.required, comparePasswords]"
                        type="password"
                        label="Повторите пароль"
                        required
                    />

                    <v-btn
                        :disabled="!valid"
                        color="success"
                        type="submit"
                        @click="validate"
                        class="reg-form__btn"
                    >
                        Зарегистрироваться
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<style scoped>
    .reg-form {
        width: 500px;
    }

    .reg-form__btn {
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
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            rules: {
                required: value => !!value || 'Заполните обязательное поле',
                emailMatch: value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || 'Неверный формат E-mail',
                passwordMinChars: value => value.length >= 6 || 'Минимальная длина пароля - 6 символов'
            }
        }),
        computed: {
            error: function () {
                return storage.getters['error'];
            }
        },
        methods: {
            validate: function () {
                this.valid = !!this.$refs.regForm.validate();
            },
            comparePasswords: function () {
                return this.password === this.passwordConfirm || 'Пароли не совпадают';
            },
            register: async function () {
                if (this.valid) {
                    await storage.dispatch('register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.passwordConfirm
                    }).then(() => {
                        this.$router.push('/login')
                    });
                }
            }
        },
    }
</script>