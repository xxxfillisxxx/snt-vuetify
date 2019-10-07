<template>


    <v-card
            class="mx-auto"
            max-width="400"
            tile
    >

        <v-list-item
                v-for="(link, i) in links"
                :key="i"
                @click=""
        >

          <v-list-item-content>
            <v-list-item-title  v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

    </v-card>


</template>

<script>
    export default {
        name: 'sidebar',
        props: ['value'],
        data: () => ({
            links: [
                { title: 'Пользователи', url: '/users', exact: true },
                { title: 'Счета', url: '/checks', exact: true },

            ]
        })
    }
</script>

<style scoped>

</style>