<template>
  <div class="row m-5">
    <div class="col-md-6">
      <h5>
        hello, I'm {{ u?.name }} <img :src="u?.avatar" width="80" /> /
        <NuxtLink to="/logout">Logout</NuxtLink>
      </h5>

      <div v-if="u.role == 'admin'">
        <h3>Add customer</h3>
        <form @submit.prevent="handlePost">
          <div class="mb-3">
            <label>Nama</label>
            <input v-model="form.nama" class="form-control" type="text" required>
          </div>
          <div class="mb-3">
            <label>Alamat</label>
            <textarea v-model="form.alamat" class="form-control" rows="2" required></textarea>
          </div>
          <button class="btn btn-dark" type="submit">Kirim</button>
        </form>
      </div>

      <hr />

      <div v-if="isLoading">loading post</div>

      <div v-else>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>NAMA</th>
              <th>ALAMAT</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(c,i) in customers" :key="c.id">
              <td>{{ i+1 }}.</td>
              <td>{{ c.nama }}</td>
              <td>{{ c.alamat }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

let client = usePocketBaseClient();
let user = usePocketBaseUser();
let u = user.user.value;

let form = ref({
  nama: '',
  alamat: '',
});

let customers = ref([]);
let isLoading = ref(true);

async function getCustomers() {
  isLoading.value = true;
  client.autoCancellation(false) // auto cancellation
  const data = await client
    .collection("customers")
    .getFullList({ sort: "-created" });
  if (data) {
    customers.value = data;
    isLoading.value = false;
  }
}

async function handlePost() {
  const data = await client.collection("customers").create(form.value);
  if (data) {
    form.value.nama = "";
    form.value.alamat = "";
  }
}

onMounted(() => {
  getCustomers();
  client.collection('customers').subscribe('*', function (e) {
    if(e.action == 'create') getCustomers()
  }, {});
});
</script>
