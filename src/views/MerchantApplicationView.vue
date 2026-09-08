<script setup lang="ts">
import { reactive } from 'vue'
import api from '@/api/axios'

const form = reactive({
  name: '',
  description: '',
  location: '',
  phone: '',
})

async function submitApplication() {
  try {
    const response = await api.post('/merchant/application', form)
    console.log(response.data)
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div>
    <h1>Apply as merchant</h1>

    <form @submit.prevent="submitApplication">
      <div>
        <label>Merchant Name</label>
        <input type="text" v-model="form.name" />
      </div>

      <div>
        <label>Description</label>
        <textarea v-model="form.description"></textarea>
      </div>

      <div>
        <label>Location</label>
        <input type="text" v-model="form.location" />
      </div>

      <div>
        <label>Phone</label>
        <input type="text" v-model="form.phone" />
      </div>

      <button type="submit">Submit Application</button>
    </form>
  </div>
</template>
