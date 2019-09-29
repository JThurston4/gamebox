<template>
  <div id="app">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Gridbox Games</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
          aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor02">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'home'}">Games</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'home'}">Profile</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'home'}">About</router-link>
            </li>
          </ul>
          <div class="container">
            <div class="centered row">
              <div class="col-lg-8"></div>
              <router-link :to="{name: 'login'}" class="col-lg-2 col-md-12 login" v-if="!getUser._id">
                <button class="btn btn-outline-success" href="#">Login</button>
              </router-link>
              <div class="col-lg-2 col-md-12 register" v-if="!getUser._id">
                <button class="btn btn-secondary" href="#">Register</button>
              </div>
              <div class="col-lg-4 col-md-12 login" v-if="getUser._id">
                <button class="btn btn-outline-danger" href="#">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {

      }
    },
    computed: {
      getUser() {
        return this.$store.state.user;
      }
    },
    methods: {},
    components: {},
    props: [],
  }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.centered{
  display: flex;
  justify-content: center;
}

.login .register {
  display:flex;
  justify-content: center;
}

@media (min-width: 992px) {
  .login {
    display:flex;
    justify-content: flex-end;
  }

  .register {
    display:flex;
    justify-content: flex-start;
  }
}
</style>