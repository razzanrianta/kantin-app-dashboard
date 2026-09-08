<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const merchantId = route.params.merchantId
</script>

<template>
  <h1>Detail Merchant</h1>

  <p>Merchant ID: {{ merchantId }}</p>
</template>
