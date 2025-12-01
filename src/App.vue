<template>
  <h1>Что нужно сделать</h1>
  <ol>
    <li>Исправить баг почему в селекте нет дефолтного значения</li>
    <li>Добавить запрос к соответствующему json при переключении страны. json лежат в public/docs</li>
    <li>Реализовать фильтр, в который на лету будет фильтровать список по столбцу таблицы "Name university"</li>
    <li>Добавить подсветку всех вхождений из фильтра в столбце таблицы "Name university"</li>
  </ol>
  <h2 class="h2 p-3">Universities</h2>
  <div class="d-flex p-3">
    <div class="">
      <label class="d-block">Filter</label>
      <input type="text" v-model="filter">
    </div>
    <div class="ms-5">
      <label class="d-block">Countries</label>
      <select v-model="country">
        <option
          v-for="({ label, value }) in countries"
          :key="value"
          value="value"
        >{{ label }}</option>
      </select>
    </div>
  </div>
  <table class="table m-3">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name university</th>
        <th scope="col">Domains</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, i) in list"
        :key="i"
      >
        <th scope="row">{{ i }}</th>
        <td>{{ item.name }}</td>
        <td>
          <span v-for="(domain) in item.domains" :key="domain">{{ domain }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { ref } from 'vue';

const countries = [
  {
    label: 'Kazakhstan',
    value: 'kazakhstan'
  },
  {
    label: 'Iran',
    value: 'iran'
  },
];

const filter = ref('');
const country = ref(countries[0].value);
const list = ref([]);

fetch('./docs/kazakhstan.json')
  .then((response) => response.json())
  .then((data) => {
    list.value = data;
  });
</script>
<style scoped>
select, input {
  line-height: 24px;
  font-size: 18px;
}
</style>