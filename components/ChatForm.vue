<template>
    <v-col cols="12" class="innerForm">
      <v-textarea
        label="Введите сообщение"
        rows="1"
        auto-grow
        outlined
        dense
        v-model="text"
        v-on:keydown.shift.enter="send"
      ></v-textarea>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    text: ''
  }),
  methods: {
    send() {
      this.$socket.emit('createMessage', {
        text: this.text,
        id: this.$store.state.user.id
      }, data => {
        if (typeof data === "string") {
          console.error(data)
        } else {
          this.text = "";
        }
      })
    }
  }
}
</script>

<style scoped>
.innerForm {

}
</style>
