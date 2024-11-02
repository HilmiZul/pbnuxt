<template>
  <div class="row m-5">
    <div class="col-md-4">
      <div v-if="errMsg" class="alert bg-danger text-white">User & Password are mismatch</div>
      <form @submit.prevent="login">
        <input type="text" v-model="user" class="form-control" placeholder="username" /><br>
        <input type="password" v-model="pass" class="form-control" placeholder="password" /><br>
        <button type="submit" class="btn btn-dark">Login</button>
      </form>
    </div>
  </div>
</template>


<script setup>
let client = usePocketBaseClient()
let user = ref()
let pass = ref()
let errMsg = ref(false)
let currUser = usePocketBaseUser()
if(currUser.isUserLoggedIn) navigateTo('/')

async function login() {
  try {
    errMsg.value = false 
    const authData = await client.collection('users').authWithPassword(
      user.value,
      pass.value
    )
    if(authData) {
      navigateTo('/')
    }
  } catch (error) {
    errMsg.value = true   
	}
}
</script>
