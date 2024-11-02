<template>
  <div>logging out</div>
</template>

<script setup>
let client = usePocketBaseClient()

function logout() {
  client.authStore.clear()
	navigateTo('/login')
}	

onMounted(() => logout())
</script>
