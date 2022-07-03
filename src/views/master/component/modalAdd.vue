<template>
<!-- Modal -->
  
    <b-modal
      id="modal-form"
      ref="modal-form"
      v-model="modalShow" 
      :title.sync="form_data.title" 
      @hidden.prevent="resetModal"
      @ok="handleOk"  
    >
      <form ref="form" @submit.stop.prevent="handleOk">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required" 
        >
          <b-form-input
            id="name-input"
            v-model="form_data.name" 
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Harga"
          label-for="harga-input"
          invalid-feedback="Name is required" 
        >
          <b-form-input
            id="harga-input"
            v-model="form_data.harga" 
            required
          ></b-form-input>
        </b-form-group>
      </form> 
    </b-modal>

<!-- <div class="modal fade" id="addModal" tabindex="-1"  aria-labelledby="addModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addModalLabel">{{form_data.title}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Nama</label>
          <input type="text" class="form-control" id="name" v-model="form_data.name" >
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">Harga</label>
          <input type="text" class="form-control" id="harga" v-model="form_data.harga" > 
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button  type="submit"  class="btn btn-primary">Save changes</button>
         <b-button variant="danger">Button</b-button>
      </div>
    </div>
  </div>
</div> -->
</template>

<script>

export default {
props:{
    modalShow:Boolean,
    form_data:Object
},
data(){
return{ 

}
},
methods:{
      resetModal() {
        this.$emit('closeModal') 
      },
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler 
        let inputForm = {
          name: this.form_data.name,
          harga: this.form_data.harga
        }
        if (this.form_data.title == 'Edit Item') {
          this.handleEdit(inputForm)
        }else{
          console.log('s');
          this.handleSubmit(inputForm)
        }
      },
      handleEdit(inputForm) {
        this.$bvModal.msgBoxConfirm('Apakah anda ingin melanjutkan?')
        .then(res => {
          inputForm.id = this.form_data.id
          this.$store.dispatch('editItem',inputForm)
          .then(res => {
            console.log(res);
          })
          this.$emit('pushRows')
          // this.$emit('closeModal')
        })
        // Hide the modal manually
        // this.$nextTick(() => {
        //   this.$bvModal.hide('modal-prevent-closing')
        // })
      },
      handleSubmit(inputForm) {
        this.$bvModal.msgBoxConfirm('Apakah anda ingin melanjutkan?')
        .then(res => {
          this.$store.dispatch('addItem',inputForm)
          .then(res => {
            console.log(res);
          })
          this.$emit('pushRows')
          // this.$emit('closeModal')
        })
        // Hide the modal manually
        // this.$nextTick(() => {
        //   this.$bvModal.hide('modal-prevent-closing')
        // })
      }
} 
}
</script>
