<template>
    <v-container fluid fill-height>

        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Вход</v-toolbar-title>
                        </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-text-field prepend-icon="person" name="login" label="Логин" type="text" v-model="login"></v-text-field>
                            <v-text-field
                                    prepend-icon="lock"
                                    name="password"
                                    label="Пароль"
                                    type="password"
                                    v-model="pass"
                                    :counter="3"
                                    :rules="passRules"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="primary"
                                @click="onSubmit"
                                :loading="loading"
                                :disabled="!valid||loading"
                        >Войти</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data(){
            return{
                login: '',
                pass:'',
                valid: false,
                passRules:[
                    v => !!v || 'Пароль не заполнен',
                    v => (v && v.length >= 3) || 'Длина пароля не менее 3 символов'
                ],
            }

         },
        computed:{
          loading(){
              return this.$store.getters.getLoading
          }
        },
        methods: {
            onSubmit() {

                if (this.$refs.form.validate()) {
                    const userForm = {
                        login: this.login,
                        pass: this.pass
                    }

                    this.$store.dispatch('auth', userForm)
                        .then(() => {

                            if(this.$store.getters.user!==null) {
                                this.$router.push('/account/' + this.$store.getters.getUserId)
                            }
                        })
                        .catch(() => {this.$store.dispatch('setError', 'Не удалось выполнить запрос к базе')})

                }
            }

        }
    }
</script>

<style scoped>

</style>