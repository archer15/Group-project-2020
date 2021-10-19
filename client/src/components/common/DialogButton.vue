<template>
  <v-dialog @input="updateDialog" v-bind="$attrs">
    <template v-slot:activator="props">
      <slot name="button" v-bind="props"></slot>
    </template>
    <slot name="content"></slot>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogButton',
  props: {
    width: {
      type: String,
      default: '500px'
    }
  },
  methods: {
    updateDialog (val) {
      this.$emit('input', val)
    }
  }
}
</script>