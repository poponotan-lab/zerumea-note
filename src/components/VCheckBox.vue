<template>
    <input type="checkbox" class="check_box" :id="checkBoxId" />
    <label class="label" :for="checkBoxId">{{ checkBoxTitle }} </label>
</template>

<script>
export default {
      props: ['id', 'key', 'title'],
      setup(props) {
        return {
          checkBoxId: props.id,
          checkBoxTitle: props.title
        }
      }
}
</script>
<style scoped>
label{
  cursor: pointer;
  border-radius: 6px;
  width: 70px;
  margin-left: 4px;
  text-align: center;
  background: #B3B3B3;
  transition: background-color .2s linear;
}
input{
  display: none;
}
.check_box:checked + .label {
  background-color: #00FFFF;
  color: #333333;
}
</style>