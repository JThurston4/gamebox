<template>
  <div class="container-fluid">
    <!-- Sign in -->
    <form v-if="loginForm" v-on:submit.prevent="loginUser">
      <div class="row bottom-mar top-mar">
        <label class="col-5 centered" for="email">Email</label>
        <input type="text" class="col-6" v-model="signIn.email" placeholder="Email" id="email">
      </div>
      <div class="row bottom-mar">
        <label class="col-5 centered" for="password">Password</label>
        <input type="password" class="col-6" v-model="signIn.password" placeholder="Password" id="password">
      </div>
      <div v-on:click="loginForm = !loginForm">
        <p>No account?  Click here to register</p>
      </div>
      <button type="submit" class="btn btn-primary">Sign in</button>
    </form>

    <!-- Register -->
    <form v-if="!loginForm" v-on:submit.prevent="registerUser">
      <div class="row bottom-mar top-mar">
        <label class="col-5 centered" for="email">Email</label>
        <input type="text" class="col-6" v-model="regUser.email" placeholder="Email" id="email">
      </div>
      <div class="row bottom-mar">
        <label class="col-5 centered" for="username" >Username</label>
        <input type="text" class="col-6" v-model="regUser.name" placeholder="Username" id="username">
      </div>
      <div class="row bottom-mar">
        <label class="col-5 centered" for="password" >Password</label>
        <input type="password" class="col-6" v-model="regUser.password" placeholder="Password" id="password">
      </div>
      <div v-on:click="loginForm = !loginForm">
        <p>Already have an account?  Click here to sign in</p>
      </div>
      <button type="submit" class="btn btn-primary">Create Account</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        loginForm: true,
        regUser: {
          name: '',
          email: '',
          password: ''
        },
        signIn: {
          email: '',
          password: ''
        }
      }
    },
    computed: {},
    methods: {
      registerUser() {
        this.$store.dispatch('register', this.regUser)
      },
      loginUser() {
        this.$store.dispatch('login', this.signIn)
      }
    },
    components: {},
    props: [],
  }

</script>

<style>
.centered{
  display: flex;
  justify-content: center;
}
.bottom-mar{
  margin-bottom: 10px;
  /* border: 2px solid red; */
}
.top-mar{
  margin-top: 20px;
}

@media (min-width: 992px) {
  .centered{
    justify-content: flex-end;
  }
}
</style>
