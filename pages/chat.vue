<template>
  <div class="c-wrap">
    <div class="c-chat" ref='block'>
      <Message
        v-for="(m, index) in messages" :key="index"
        :name="m.name"
        :text="m.text"
        :owner="m.id === user.id"
      />
    </div>
    <div class="c-form">
      <ChatForm />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Message from '@/components/Message'
import ChatForm from '@/components/ChatForm'
export default {
  head(){
    return {
      title: `Комната ${this.user.room}`
    }
  },
  middleware: ['chat'],
  components: {
    Message,
    ChatForm
  },
  computed: mapState(['user', 'messages']),
  watch: {
    messages() {
      setTimeout(()=> {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight
      });
    }
  }
}
</script>

<style scoped>
  .c-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .c-form {
    position: absolute;
    overflow: hidden;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    min-height: 100px;
    background: #212121;
  }

  .c-chat {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 95px;
    padding: 1rem;
    overflow-y: auto;
  }
</style>
