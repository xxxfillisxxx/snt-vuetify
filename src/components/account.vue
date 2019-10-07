<template>
  <v-container>
    <div>
      <v-layout row>
        <v-flex xs12 >
          <h1>Лицевой счет</h1>

          <hr>


          <v-layout row pt-5>
            <v-flex xs12 sm8 offset-sm2>
              <v-card>
                <v-layout
                        column
                        fill-height
                >
                  <v-card-text>{{fio}}

                  </v-card-text>




                </v-layout>

                <v-list dense>
                  <v-list-item two-line v-for="(section, i) of sections" :key=i>

                    <v-list-item-icon>
                      <v-icon color="indigo">location_on</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-content>{{section.sections}}</v-list-item-content>
                    </v-list-item-content>


                  </v-list-item>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row pt-5>
            <v-flex xs12 sm8 offset-sm2>
              <v-data-table pt-5
                            :headers="headers"
                            :items="checks"
                            class="elevation-1 "


              >
                <template v-slot:items="props">
                  <td class="text-xs-right">{{ props.item.nom }}</td>
                  <td class="text-xs-right">{{ props.item.date }}</td>
                  <td class="text-xs-right">{{ props.item.uchastok }}</td>
                  <td class="text-xs-right">{{ props.item.kvt }}</td>
                  <td class="text-xs-right">{{ props.item.sum }}</td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

    </div>
  </v-container>
</template>

<script>
    export default {
        data() {
            return {
                headers: [
                    {
                        text: 'Номер',
                        align: 'center',

                        value: 'nom'
                    },
                    {text: 'Дата', align: 'center', value: 'date', sortable: true},
                    {text: 'Участок', align: 'center', value: 'uchastok'},
                    {text: 'КВт', align: 'center', value: 'kvt'},
                    {text: 'Сумма', align: 'center', value: 'sum'},
                ],
            }
        },
        props: ['nom', 'date', 'uchastok', 'kvt', 'sum'],
        computed: {
            checks() {
                return this.$store.getters.getChecks
            },
            sections() {
                return this.$store.getters.getSections
            },
            fio() {
                return this.$store.getters.getUserName
            }
        },
        expand: false,

        // checks:[],
        // sections:[]
    }
</script>

<style scoped>

</style>