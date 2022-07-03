<template>
  <div class="">
    <b-nav align="center" class="bg-secondary">
          <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
      <b-nav-item exact exact-active-class="active">
        <router-link class="nav-link text-white" to="/"
          >Home</router-link
        ></b-nav-item
      >
      <b-nav-item exact exact-active-class="active">
        <router-link class="nav-link text-white" to="/tools"
          >Tools</router-link
        ></b-nav-item
      >
      <b-nav-item-dropdown text="Master" class="nav-link text-white" white>
        <span></span>
        <b-dropdown-item>
          <router-link class="nav-link text-dark" to="/master/item"
            >Master Item</router-link
          ></b-dropdown-item
        >
        <b-dropdown-item>
          <router-link class="nav-link text-dark" to="/master/trx"
            >Transaction</router-link
          ></b-dropdown-item
        >
      </b-nav-item-dropdown>
 
      <b-nav-item exact exact-active-class="active">
        <router-link class="nav-link text-white" to="/contact"
          >Contact</router-link
        ></b-nav-item
      >
    </b-nav>
    <!-- <ul class="nav bg-primary justify-content-center">
      <li class="nav-item">
        <router-link class="text-white nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="text-white nav-link" to="/tools">Tools</router-link>
      </li>

      <li class="nav-item">
        <router-link class="text-white nav-link" to="/master"
          >Master</router-link
        >
      </li>

      <li class="nav-item">
        <router-link class="text-white nav-link" to="/contact"
          >Contact</router-link
        >
      </li>
    </ul> -->
  </div>
</template>
<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
* >>> span {
  color: white !important;
}
</style>
