<template>
  <v-container>
    <div>
    <v-layout row>
      <v-flex pt-3  xs12 >
  <v-tabs
          fixed-tabs
          background-color="blue"
          dark

  >
    <v-tab>
      Пользователи
    </v-tab>
    <v-tab-item>
      <v-flex pt-5 >
        <v-card >
          <v-card-title>
            <div class="flex-grow-1"></div>
            <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Поиск"
                    single-line
                    hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
                  v-model="selected"
                  :headers="headers"
                  :items="users"
                  :single-select="singleSelect"
                  :search="search"
                  :loading="loading"
                  item-key="name"
                  show-select


          >
            <template v-slot:top>
              <v-toolbar flat color="white">


                <div class="flex-grow-1"></div>
                  <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">Добавить</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.login" label="Логин"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.password" label="Пароль"></v-text-field>
                          </v-col>
                          <v-list-item>
                            <v-list-item-action>
                              <v-checkbox v-model="editedItem.admin" ></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>Админ</v-list-item-title>
                              <v-list-item-subtitle>Пользователь является администратором?</v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-content>

                            </v-list-item-content>
                          </v-list-item>


                        </v-row>
                        <v-list dense>

                          <v-subheader v-text="'Участки'"></v-subheader>
                          <v-select

                            v-model="editedItem.sections"
                            :items="sectionsAll"
                            item-text="sections"
                            item-value="id"
                            multiple


                           ></v-select>


                        </v-list>

                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="blue darken-1" text @click="dialog=false">Отмена</v-btn>
                      <v-btn color="blue darken-1" text @click="addUser">Сохранить</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogNewCheck" max-width="300">
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitleChecks }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-text-field label="Номер"></v-text-field>
                      <v-text-field label="Дата"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="blue darken-1" text @click="dialogNewCheck=false">Отмена</v-btn>
                      <v-btn color="blue darken-1" text @click="addNewCheck">Добавить</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon
                      small
                      class="mr-2"
                      @click="editItem(item)"
              >
                edit
              </v-icon>
              <v-icon
                      small
                      @click="deleteItem(item)"
              >
                delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>

        </v-flex>
    </v-tab-item>
    <v-tab>
     Участки
    </v-tab>
    <v-tab-item>
      <v-flex pt-5 >
        <v-card >
          <v-card-title>

      <v-text-field
              v-model="searchSection"
              append-icon="search"
              label="Поиск"
              single-line
              hide-details
      ></v-text-field>
          </v-card-title>
      <v-icon
              small
              @click="dialogNewCheck=true"
      >
        add
      </v-icon>
      <v-icon
              small
              @click="dialogEditCheck=true"
      >
        edit
      </v-icon>
      <v-icon
              small
              @click="deleteItemChecks(item)"
      >
        delete
      </v-icon>
      <v-data-table
              dense
              v-model="selectedSections"

              :items="sectionsAll"
              :headers="headersSections"
              :search="searchSection"
              item-key="section"
              show-select
              :single-select="singleSelectSections"
              class="elevation-1"
      ></v-data-table>

        </v-card>

      </v-flex>
    </v-tab-item>
    <v-tab>
      Счета
    </v-tab>
    <v-tab-item>
      <v-data-table
              dense
              v-model="selectedChecks"
              :items="checksAll"
              :headers="headersChecksAll"
              item-key="id"
              show-select
              :single-select="singleSelectChecks"
              class="elevation-1"
      ></v-data-table>
    </v-tab-item>

  </v-tabs>

      </v-flex>
    </v-layout>
    </div>
  </v-container>

</template>

<script>
    export default {
        data () {
            return {
                dialog: false,
                dialogNewCheck: false,
                singleSelect: true,
                singleSelectSections: false,
                singleSelectChecks: true,
                sectionsNewUser: [],
                selected: [],
                selectedSections: [],
                selectedChecks: [],
                selectSectionsDialog: false,
                search: '',
                searchSection: '',
                headers: [
                    { text: 'ID', value: 'id' },
                    {
                        text: 'Логин',
                        align: 'left',
                        sortable: false,
                        value: 'login',
                    },
                    { text: 'Actions', value: 'action', sortable: false },
                ],
                headersChecks:[
                { text: 'Номер', value: 'nom' },
                { text: 'Дата', value: 'date' },
                { text: 'Сумма', value: 'sum', sortable: false },
                ],
                headersChecksAll:[
                { text: 'id', value: 'id' },
                { text: 'Номер', value: 'nom' },
                { text: 'Дата', value: 'date' },
                { text: 'Потребление КВт', value: 'kvt' },
                { text: 'Сумма', value: 'sum', sortable: false },

        ],
                headersSections: [
                    { text: 'id', value: 'id' },
                    { text: 'Участок', value: 'section' },
                ],
                editedIndex: -1,
                editedIndexChecks: -1,
                editedItem: {
                    id: '',
                    login: '',
                    password: '',
                    admin: false,
                    sections: [],
                    checks:[],
                },
                newUser: {
                    login: '',

                    password: '',
                    admin: false,
                    sections: [],
                    checks:[],
                },
                defaultItem: {
                    id: '',
                    login: '',
                    password: '',
                    admin: false,
                },

            }
        },
        props: ['id', 'login', 'section', ' nom'],
        computed: {
          loading(){
              return this.$store.getters.getLoading
          },


            users(){

                return this.$store.getters.getUsers
            },
            sections(){

                return this.$store.getters.getSections
            },
            sectionsAll(){

                return this.$store.getters.getSectionsAll
            },
            checksAll(){

                return this.$store.getters.getChecksAll
            },
          formTitle () {
                return this.editedIndex === -1 ? 'Добавить' : 'Редактирование'
          },
            formTitleChecks () {
                return this.editedIndexChecks === -1 ? 'Добавить' : 'Исзменить'
            },

        },

        watch: {
            dialog (val) {
                val || this.close()
            },
            newUserId(){
                console.log(this.newUserId)
                return this.$store.getters.getNewUserId
            },
        },
        methods:{
            editItem (item) {
                this.editedIndex = this.users.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.users.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.users.splice(index, 1)
            },
            deleteItemChecks (item) {
                const index = this.users.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.users.splice(index, 1)
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.users[this.editedIndex], this.editedItem)
                } else {
                    this.users.push(this.editedItem)
                }
                this.close()
            },
            async addUser () {
                if (this.editedIndex > -1) {
                    Object.assign(this.users[this.editedIndex], this.editedItem)

                } else {
                    await this.$store.dispatch('addUser',  this.editedItem)
                    // this.editedItem.id=this.$store.getters.getNewUserId
                    this.users.push(this.editedItem)
                    console.log(this.editedItem)
                }
                this.close()

            },
            addNewCheck(){
                if (this.editedIndex > -1) {
                    Object.assign(this.users[this.editedIndexChecks], this.editedItem)

                } else {
                    console.log(this.editedItem)
                }
            }
        }

    }


</script>

<style scoped>

</style>