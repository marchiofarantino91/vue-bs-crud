<template>
  <div class="">
    <h1>Data Transaksi</h1>
    <div class="container">
      <modal :modalShow="modalShow" @pushRows="pushRows" :target="target" @closeModal="closeModal" :form_data="form_data"/>
      <div class="row">
        <div class="col-2 my-5">
                <b-button class="btn btn-primary btn-sm" id="show-btn" @click="addRows"><b-icon-plus-circle/> Tambah Item</b-button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <list :rows="rows" @editRows="editRows" @deleteRows="deleteRows"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modal from './component/modalAdd.vue' 
import list from './component/listDataTrx.vue' 
import axios from 'axios'
export default {
  components: {
    modal,list 
  },
  data(){
    return {
      target:'example',
      rows:[],
      modalShow:false,
      form_data : {}
    }
  },
  created(){
    this.loadItems();
  },
  methods:{
    resetModal(){
      console.log('close');
      this.modalShow = false;
      this.form_data = {}
    },
    showModal() {
      console.log('open');
      this.modalShow = true;
    },
    closeModal(){
      this.modalShow = false;
      this.form_data = {} 
      this.loadItems()
    },
    deleteRows(payload){ 
      console.log(payload);
        this.$bvModal.msgBoxConfirm('Apakah anda ingin menghapus item?')
        .then(res => {
          this.$store.dispatch('deleteItem',{id :payload.id})
          .then(res => {
            console.log(res);
            this.loadItems()
          })
          // this.$emit('closeModal')
        })
    },
    editRows(payload){ 
      this.modalShow = true;
      this.form_data = {
        title: 'Edit Item',
        id:payload.id,
        name: payload.name,
        harga: payload.harga,
      }
    },
    pushRows(){
      this.modalShow = false;
      this.form_data = {}
      console.log('load');
      this.loadItems()
    },
    addRows(){
      this.modalShow = true;
      this.form_data = {
        title: 'Tambah Item',
        name: '',
        harga: '',
      }
    },
    async loadItems(){
       await axios.get('http://localhost:3000/transaction')
       .then(res => {
        this.rows = res.data
       })
    },
 }
,
}
</script>
