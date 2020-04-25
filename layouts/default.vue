<template>
  <v-app app dark>
    <v-navigation-drawer app v-model="drawer" ref='block' v-bind:mobile-break-point="breakpoint">
      <v-list subheader>
        <v-subheader>Список людей в комнате</v-subheader>

        <v-list-item
          v-for="u in users"
          :key="u.id"
          @click.prevent
        >
          <v-list-item-content>
            <v-list-item-title>{{u.name}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="u.id===user.id ? 'primary' : 'grey'">mdi-message-text</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click="exit">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Комната {{user.room}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>

      <!-- Provides the application the proper gutter -->
      <div style="height: 100%">
        <nuxt/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data(){
    return {
      drawer: true,
      breakpoint: 600,
    }
  },
  computed: {
    ...mapState(['user', 'users']),
  },
  created() {
    window.addEventListener('widther', this.hideDrawer);
    this.hideDrawer();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    ...mapMutations(['clearData']),
    hideDrawer() {
      if (window.innerWidth < this.breakpoint) this.drawer = false;
    },
    exit() {
      this.$socket.emit('userLeft', this.user.id, ()=>{
        this.$router.push('/?message=leftChat');
        this.clearData();
      });
    }
  }
}
</script>
