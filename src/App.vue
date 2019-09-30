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
              <router-link :to="{name: 'login'}" class="col-lg-4 col-md-12 login" v-if="!getUser._id">
                <button class="btn btn-outline-success" href="#">Login / Sign up</button>
              </router-link>
              <div class="col-lg-4 col-md-12 login" v-if="getUser._id">
                <button class="btn btn-outline-danger" href="#">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    <router-view/>
    <!-- Modal -->
    <div class="modal fade" id="register" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Register</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="registerUser">
              <div class="row bottom-pad">
                <label class="col-4" for="email" >Email</label>
                <input type="text" class="col-6" v-model="regUser.email" placeholder="Email" id="email">
              </div>
              <div class="row bottom-pad">
                <label class="col-4" for="username" >Username</label>
                <input type="text" class="col-6" v-model="regUser.name" placeholder="Username" id="username">
              </div>
              
              <div class="row">
                <label class="col-4" for="password" >Password</label>
                <input type="password" class="col-6" v-model="regUser.password" placeholder="Password" id="password">
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        regUser: {
          name: "",
          email: "",
          password: ""
        }
      }
    },
    computed: {
      getUser() {
        return this.$store.state.user;
      }
    },
    methods: {
      registerUser() {
        console.log(this.regUser)
        
      }
    },
    components: {},
    props: [],
  }

</script>

<style scoped>
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

label {
  padding-right: 10px;
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