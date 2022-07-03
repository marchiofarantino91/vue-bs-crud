<template> 
    <table style="width:100%" class="table   table-hover table-sm">
        <thead>
            <th>
                <td>NO</td>
            </th>
            <th>
                <td>ID TRX</td>
            </th>
            <th>
                <td>PRODUK</td>
            </th>
            <th>
                <td>QTY</td>
            </th>
            <th>
                <td>HARGA</td>
            </th>
            <th>
                <td>SUBTOTAL</td>
            </th>
        </thead>
        <tbody v-for="row,index in rows" :key="index">
            <tr>
                <td :rowspan="row.products.length">{{index+1}}</td>
                <td :rowspan="row.products.length">{{row.id}}</td>
                <td >
                    <span
                    v-for="(produk, index) in row.products"
                    :key="'produk-' + index"
                    v-if="index == 0"
                    >
                        {{produk.name}}
                    </span>
                </td>
                <td >
                    <span
                    v-for="(produk, index) in row.products"
                    :key="'produk-' + index"
                    v-if="index == 0"
                    >
                        {{produk.qty}}
                    </span>
                </td>
                <td >
                    <span
                    v-for="(produk, index) in row.products"
                    :key="'produk-' + index"
                    v-if="index == 0"
                    >
                        {{produk.harga|money}}
                    </span>
                </td>
                <td>
                    <span
                    v-for="(produk, index) in row.products"
                    :key="'produk-' + index"
                    v-if="index == 0"
                    >
                        {{calculate(produk.qty,produk.harga)|money}}
                    </span>
                </td>
                
    
            </tr>
            <tr v-for="(produk, index) in row.products"
                    :key="'produk-' + index"
                    v-if="index > 0">
             <td >
                    <span 
                    >
                        {{produk.name}}
                    </span>
                </td>
                <td >
                    <span 
                    >
                        {{produk.qty}}
                    </span>
                </td>
                <td >
                    <span 
                    >
                        {{produk.harga|money}}
                    </span>
                </td>    
                <td>
                        {{calculate(produk.qty,produk.harga)|money}}
                    
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
    filters:{
         money(value) {
      if (!value) return "";
      let reverse = parseInt(value).toString().split("").reverse().join(""),
        k = reverse.match(/\d{1,3}/g);
      return k.join(".").split("").reverse().join("") + ",-";
    },
    },
    methods:{
        calculate(a,b){
            return Number(a) * Number(b)
        },
        editRows(payload){
            this.$emit('editRows',payload)
        },
        deleteRows(payload){
            this.$emit('deleteRows',payload)
        }
    }
    
} 
</script>
