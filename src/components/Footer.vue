<template>
  <div class="mt-5 mt-sm-0">
    <footer class="fixed-bottom px-3">
      <a href="https://zakir-mhv.github.io" target="_blank">&copy; 2021 Zakir Maharramov</a>
    </footer>
  </div>
</template>

<script>

export default {
  name: "Footer",
}
</script>

<style scoped>
footer {
  background-color: #343A40;
  height: 40px;
  display: flex;
  align-items: center;
}

footer a {
  color: white;
}

footer a:hover {
  color: gray;
  text-decoration: none;
}
</style>
