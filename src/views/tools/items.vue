<template>
  <div class="">
    <h1>Tools</h1>
    <router-link class="text-dark nav-link" to="/tools">Previous</router-link>
    <hr />
    <div class="container">
      <div class="row"> 
      <div class="col-6">
       
        <!-- <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama Item</th>
              <th scope="col">Harga</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in items" :key="index">
            <tr>
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.name }}</td>
              <td>Rp. {{ item.harga }}</td>
              <td>
                <a class="btn btn-primary btn-sm" title="Tambah Barang" @click="addCart(item)">Tambah</a>
              </td>
            </tr>
          </tbody>
        </table> -->
      </div>
    </div> 
    <div class="row"> 
        <div class="col-12">
          <h1>Cart Items</h1>  
        </div>
         <div class="col-12 mb-5">
            <b-form-select v-model="selectItems"  @change="addItem"  >
              <template #first>
                <b-form-select-option :value="{}" disabled>-- Please select an item --</b-form-select-option>
              </template>
              <b-form-select-option :key="index" :disabled="option.disabled" v-for="option,index in items" :value="option">
                {{ option.name }} - Rp. {{ money(option.harga )}}
              </b-form-select-option>
            </b-form-select> 
           <!-- <select
              v-model="selectItems"
              @change="addItem"
              class="form-select form-select-lg mb-3"
              style="width:100%"
              aria-label=".form-select-lg example"
            >
              <option :key="index" :disabled="option.disabled" v-for="option,index in items" :value="option">
                {{ option.name }} - Rp. {{ money(option.harga )}}
              </option>
            </select> -->
         </div> 
         <div class="col-12 mb-3">
          <div class="d-flex justify-content-end">
            <b-button @click="handleSubmit" variant="primary" primary class="btn btn-sm mr-3 btn-primary">Submit Cart</b-button>
            <b-button @click="clearCart" v-if="listCard.length > 0" class="btn btn-sm  btn-danger">Clear Cart</b-button>
            <b-button disabled  v-else class="btn btn-sm  btn-danger">Clear Cart</b-button>
          </div>
         </div>
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama Item</th>
              <th scope="col">QTY</th>
              <th scope="col">Harga</th>
              <th scope="col">Subtotal</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listCard" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.name }}</td>
              <td><input min="1" style="width: 50px" type="number" v-model.number="item.qty" /></td>
              <td>
                <input :step="100" style="width: 100px" type="number" v-model.number="item.harga" />
              </td>
              <td style="text-align: justify">{{money( Number(item.qty) * Number(item.harga) )}}</td>
              <td>
                <a class="btn btn-danger btn-sm" title="Tambah Barang" @click="removeCart(item)"><b-icon-trash></b-icon-trash></a>
              </td>
            </tr>
            <tr>
              <td colspan="4"><span style="text-align: right">Total</span></td>
              <td>{{ money(totalCart )}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  computed: {
    totalCart() {
      if (this.listCard.length > 0) {
        let total = []
        this.listCard.forEach((item) => {
          total.push(Number(item.qty) * Number(item.harga))
        })
        return total.reduce((a, b) => a + b, 0)
      } else {
        return 0
      }
    },
  },
  data() {
    return {
      selectItems: {},
      items:  [],
      listCard: [],
    }
  },
  created(){
    this.getItem();
  },
  methods: {
    clearCart(){
      this.$bvModal.msgBoxConfirm('Apakah anda ingin menghapus daftar belanja?')
      .then( (res) => {
       if (res) {
         this.listCard = [];
        this.items.forEach(item=>item.disabled = false)
       }
      }) 
    },
      handleSubmit() {
        let date = new Date().toISOString() 
        let inputForm = {
          products: this.listCard,
          created_datetime: date
        }
        this.$bvModal.msgBoxConfirm('Apakah anda ingin menyimpan daftar belanja?')
        .then(res => {
         
          this.$store.dispatch('addCart',inputForm)
          .then(res => {
            console.log(res);
            this.listCard = [];
        this.items.forEach(item=>item.disabled = false)

          }) 
          // this.$emit('closeModal')
        })
        // Hide the modal manually
        // this.$nextTick(() => {
        //   this.$bvModal.hide('modal-prevent-closing')
        // })
      },
    async getItem(){
       await axios.get('http://localhost:3000/items')
       .then(res => {
        this.items = res.data
       })
    },
    money(value) {
      if (!value) return '0,-'
      let reverse = parseInt(value).toString().split('').reverse().join(''),
        k = reverse.match(/\d{1,3}/g)
      return k.join('.').split('').reverse().join('') + ',-'
    },
    addItem() {
      // console.log(this.selectItems)
      let temp = { ...this.selectItems }
      temp.qty = 1
      let exist = this.listCard.find((item) => item.name == temp.name)

      if (typeof exist !== 'undefined') {
        // this.listCard.find((item) => item.name == temp.name).qty += 1
        alert('Item sudah terpilih!')
      } else {
        this.listCard.push(temp)
        this.items.find((item) => item.name == temp.name).disabled = true
      }
      this.selectItems = {}
      // this.listCard.push(data)
    },
    addCart(data) {},
    removeCart(data) {
      // if (data.qty > 1) {
      //   data.qty -= 1
      // } else {
      let idx = this.listCard.indexOf(data)
      this.listCard.splice(idx, 1)
      this.items.find((item) => item.name == data.name).disabled = false

      // }
    },
  },
}
</script>

<style scoped>
select option:disabled {
    color: #000;
    text-decoration: line-through;
    font-weight: bold;
}
</style>