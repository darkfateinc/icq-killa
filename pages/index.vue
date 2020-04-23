<template>
  <v-layout
    column
    justify-center
    align-center
  >
  <v-flex xs12 sm8>
    <v-card min-width="400">
      <v-card-title>ЧЯТ</v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            :counter="16"
            :rules="nameRules"
            label="Имя"
            required
          ></v-text-field>

          <v-text-field
            v-model="room"
            :counter="16"
            :rules="roomRules"
            label="Комната"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="submit"
          >
            Войти
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-flex>
  </v-layout>
</template>
<script>

import {mapMutations} from 'vuex'

export default {
  head: {
    title: "Добро пожаловать в ЧЯТ"
  },
  layout: 'empty',
  sockets: {
    connect() {
      console.log("Ready")
    }
  },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Введите имя',
      v => (v && v.length <= 16) || 'Имя должно содержать не более 16 символов',
    ],
    room: '',
    roomRules: [
      v => !!v || 'Введите название комнаты',
      v => (v && v.length <= 16) || 'Название должно содержать не более 16 символов',
    ]
  }),
  methods: {
    ...mapMutations(['setUser']),
    submit() {
      if(this.$refs.form.validate()){
        const user = {
          name: this.name,
          room: this.room
        };
        this.$socket.emit('userJoined', user, data => {
          if(typeof data === 'string') {
            console.error(data)
          } else {
            user.id = data.userId
            this.setUser(user);
            this.$router.push("/chat");
          }
        });
      }
    }
  },
}
</script>
