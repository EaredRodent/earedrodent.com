<template>
  <div class="a1-Login">
    <div class="a1-wrapper">
      <v-card class="a1-form">
        <v-card-title class="title">
          Вход
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-validate="'required|email|min:6'"
              v-model="username"
              :error-messages="errors ? errors.collect('username') : null"
              label="Логин" name="username"
              @keypress.enter="submit"
            />
            <v-text-field
              v-validate="'required|min:6'"
              v-model="password"
              :error-messages="errors ? errors.collect('password') : null"
              type="password"
              label="Пароль" name="password"
              @keypress.enter="submit"
            />
            <v-checkbox
              v-model="untrustedComputer"
              label="Чужой кампхуктер"/>
            <v-layout class="justify-end">
              <v-btn
                class="primary"
                @click="submit">Войти
              </v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      username: '',
      password: '',
      untrustedComputer: false
    }
  },
  methods: {
    async submit () {
      let res = await this.$validator.validate()
      if (res) {
        try {
          await this.$store.dispatch('other/auth/login', { username: this.username, password: this.password })
        } catch (e) {
          alert('Ошибка авторизации')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
