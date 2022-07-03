<template> 
    <table style="width:100%" class="table table-striped table-hover">
        <thead>
            <th>
                <td>No</td>
            </th>
            <th>
                <td>Nama</td>
            </th>
            <th>
                <td>Harga</td>
            </th>
            <th>
                <td>Aksi</td>
            </th>
        </thead>
        <tbody>
            <tr v-for="row,index in rows" :key="index">
                <td>{{index+1}}</td>
                <td>{{row.name}}</td>
                <td>{{row.harga}}</td>
                <td nowrap class="d-flex">            
                    <button type="button" class="btn  btn-sm btn-primary mr-3" @click="editRows(row)"  >
                    <b-icon-pencil-square /> Edit</button>
                    <button type="button" class="btn btn-sm  btn-danger" @click="deleteRows(row)"  >
                    <b-icon-trash /> Delete </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script> 
export default  {
    props:{
        rows:Array
    },
    methods:{
        editRows(payload){
            this.$emit('editRows',payload)
        },
        deleteRows(payload){
            this.$emit('deleteRows',payload)
        }
    }
    
} 
</script>
