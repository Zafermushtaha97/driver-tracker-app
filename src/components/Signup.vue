<template>
<div>
   <div class="main pt-3">
     <div class="mx-auto d-flex justify-content-center pt-5">
    <b-form class="w-25 mt-4 p-3 bg-light" @submit.prevent="signUp">
      <b-card>
        <b-form-group>
        <b-form-input
          v-model="email"
          type="email"
          required
          placeholder="Enter your email"
        ></b-form-input>
        </b-form-group>
        <b-form-group>
        <b-form-input
          v-model="username"
          type="text"
          required
          placeholder="Enter your username"
        ></b-form-input>
        </b-form-group>
        <b-form-group>
        <b-form-input
          type="password"
          v-model="password"
          required
          placeholder="Password"
        ></b-form-input>
        </b-form-group>
         <b-button type="submit" variant="success" class=" w-100">SignUp</b-button>
      </b-card>
      <b-button variant="light" class="mt-2" router :to="{ name: 'login' }">
           Log in
         </b-button>
    </b-form>
    </div>
  </div>

  </div>
</template>
<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      email: "",
      username:"",
      password: "",
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    
    };
  },
  methods: {
   signUp() {
   firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
         this.addUserToDB(user);
      })
      .catch(error => {
         this.error = error.message;
      });
},
async addUserToDB({user}) {
   try {
      const db = firebase.firestore(); 
      db.collection("users")
         .doc(user.uid)
         .set({
            email: user.email,
            active:false,
            username:this.username,
            user_id:user.uid
            
         });
         this.$router.push({name: 'Home',})
      
   } catch (error) {
      console.log(error.message);
   }
},


  }
};
</script>

<style scopped>
  @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:ital@1&display=swap');
    .font-zilla{
            font-family: 'Zilla Slab', serif;
            font-size: 3em;
            color: #333447;
    }
    .main{
    background-image: url(../assets/map.jpg);
    height: 790px;
    background-position: center;
    background-size: cover;

    }
</style>