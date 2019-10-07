<template>
  <v-app>
    <v-layout >
      <v-flex xs12 sm8 offset-sm2>
   <div> <v-navigation-drawer
            absolute
            temporary
            v-model="drawer"
    >
      <v-list dense>
        <v-list-item
                v-for="link of links"
                :key="link.title"
                :to="link.url"
        >
          <v-list-item-icon>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
          <v-list-item-title >{{link.title}}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
        <v-list-item
                @click="logout"
                v-if="User"
        >
          <v-list-item-icon>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-icon>
          <v-list-item-content v-text="'Выйти'"></v-list-item-content>

        </v-list-item>


      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark color="primary">
      <v-app-bar-nav-icon
              @click="drawer=!drawer"
              class="hidden-md-and-up"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="white--text">Сайт</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
                v-for="link of links"
                :key="link.title"
                :to="link.url"
                text
        >
          <v-icon left>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
        <v-btn
                @click="logout"
                text
                v-if="User"
        >
          <v-icon left>exit_to_app</v-icon>
          Выйти
        </v-btn>

      </v-toolbar-items>
    </v-toolbar>
   </div>

    <router-view></router-view>

    <template v-if="error">
      <v-snackbar
              :multi-line="true"
              :timeout="5000"
              :value="true"

      >
        {{error}}
        <v-btn
                color="red"
                text
                @click="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
    export default {

        name: 'App',
        components: {


        },
        data() {
            return {
                drawer: false,
            }
        },
        methods: {
            closeError() {
                this.$store.dispatch('clearError')
            },
            logout() {
                this.$store.dispatch('logout')
                this.$router.push('/')
            }

        },
        computed: {
            error() {
                return this.$store.getters.getError
            },
            User() {
                return this.$store.getters.user
            },
            links() {
                if (this.User) {
                    if (this.User.admin) {
                        return [
                            {title: 'Администрирование', icon: 'settings_applications', url: '/administration'},
                            {title: 'Личный кабинет', icon: 'account_box', url: '/account/'+this.User.id},
                            {title: 'Главная', icon: 'view_quilt', url: '/'},
                            {title: 'Новости', icon: 'feedback', url: '/news'}
                        ]
                    }

                    return [
                        {title: 'Личный кабинет', icon: 'account_box', url: 'account/'+this.User.id},
                        {title: 'Главная', icon: 'view_quilt', url: '/'},
                        {title: 'Новости', icon: 'feedback', url: '/news'}
                    ]
                }

                return [
                    {title: 'Войти', icon: 'lock', url: '/login'},
                    {title: 'Главная', icon: 'view_quilt', url: '/'},
                    {title: 'Новости', icon: 'feedback', url: '/news'}
                ]

            },

        }
    }
</script>
<style>
  /*@import '~materialize-css/dist/css/materialize.min.css';*/
</style>
