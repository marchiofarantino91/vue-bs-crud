<template>
  <div class="">
    <h1>Calculator</h1>
    <router-link class="text-dark nav-link" to="/tools">Previous</router-link>
    <!-- list:
    <ul>
      <li>{{displayCalc}}</li>
      <li>{{displayFirst}}</li>
      <li>{{first}}</li>
      <li>{{operators}}</li>
      <li>{{second}}</li>
      <li>{{result}}</li>
    
    </ul> -->
    <div class="container">
      <div class="row">
        <div class="input-group">
          <input v-model="displayFirst" class="form-control" disabled />
        </div>
        <div class="input-group mb-3">
          <input v-model="displayCalc" class="form-control" disabled />
        </div>
        <div class="row justify-content-center">
          <div class="row justify-content-center mb-3">
            <div class="col-1">
              <button @click="addDisplay($event)" type="button" class="btn btn-outline-primary" id="bagi">/</button>
            </div>
            <div class="col-1">
              <button @click="addDisplay($event)" type="button" class="btn btn-outline-primary" id="tambah">+</button>
            </div>
            <div class="col-1">
              <button @click="addDisplay($event)" type="button" class="btn btn-outline-primary" id="kali">*</button>
            </div>
            <div class="col-1">
              <button @click="addDisplay($event)" type="button" class="btn btn-outline-primary" id="kurang">-</button>
            </div>
          </div>
          <div class="col-1">
            <button @click="addDisplay($event)" type="button" class="btn btn-outline-primary" id="7">7</button>
            <button @click="addDisplay($event)" type="button" class="btn btn-outline-primary" id="4">4</button>
            <button @click="addDisplay($event)" type="button" class="btn btn-outline-primary" id="1">1</button>
          </div>
          <div class="col-1">
            <button @click="addDisplay($event)" type="button" class="btn btn-outline-primary" id="8">8</button>
            <button @click="addDisplay($event)" type="button" class="btn btn-outline-primary" id="5">5</button>
            <button @click="addDisplay($event)" type="button" class="btn btn-outline-primary" id="2">2</button>
          </div>
          <div class="col-1">
            <button @click="addDisplay($event)" type="button" id="9" class="btn btn-outline-primary">9</button>
            <button @click="addDisplay($event)" type="button" id="4" class="btn btn-outline-primary">6</button>
            <button @click="addDisplay($event)" type="button" id="3" class="btn btn-outline-primary">3</button>
          </div>
          <div class="col-1">
            <div>
              <button @click="addDisplay($event)" type="button" id="tambah" class="btn btn-outline-primary">+</button>
              <button @click="clearAll" type="button" id="AC" class="btn btn-outline-primary">AC</button>
              <button @click="deleteDisplay" type="button" id="del" class="btn btn-outline-primary">del</button>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-5">
            <button @click="addDisplay($event)" type="button" class="btn btn-outline-primary nol" id="0">0</button>
            <button @click="calculate" type="button" id="enter" class="btn btn-outline-primary">=</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      displayCalc: '',
      displayFirst: '',
      operators: '',
      first: 0,
      second: 0,
      result: 0,
    }
  },
  methods: {
    addDisplay(event) {
      let angka = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
      let operator = ['tambah', 'kurang', 'kali', 'bagi']
      let selected = event.currentTarget.id
      if (angka.includes(selected)) {
        this.displayCalc += event.currentTarget.id
        // console.log(this.displayCalc)
      }
      if (operator.includes(selected)) {
        if (this.operators === '' && this.displayCalc !== '') {
          this.operators = event.currentTarget.id
          switch (this.operators) {
            case 'tambah':
              this.first = parseInt(this.displayCalc)
              // console.log(this.first)
              this.displayFirst = this.displayCalc + '+'
              this.displayCalc = ''
              break
            case 'kali':
              this.first = parseInt(this.displayCalc)

              this.displayFirst = this.displayCalc + '*'
              this.displayCalc = ''
              break
            case 'kurang':
              this.first = parseInt(this.displayCalc)

              this.displayFirst = this.displayCalc + '-'
              this.displayCalc = ''
              break
            case 'bagi':
              this.first = parseInt(this.displayCalc)

              this.displayFirst = this.displayCalc + '/'
              this.displayCalc = ''
              break
            default:
              break
          }
        }
      }
    },
    clearAll() {
      this.displayCalc = ''
      this.displayFirst = ''
      this.operators = ''
      this.first = 0
      this.second = 0
      this.result = 0
    },
    deleteDisplay() {
      if (this.displayCalc !== '') {
        this.displayCalc = this.displayCalc.slice(0, this.displayCalc.length - 1)
      }
    },

    calculate() {
      if (this.first != 0) {
        this.second = parseInt(this.displayCalc)
        switch (this.operators) {
          case 'tambah':
            this.result = this.first + this.second
            this.displayFirst = String(this.result)
        this.displayCalc = ''
            break
          case 'kali':
            this.result = this.first * this.second
            this.displayFirst = String(this.result)
        this.displayCalc = ''
            break
          case 'kurang':
            this.result = this.first - this.second
            this.displayFirst = String(this.result)
        this.displayCalc = ''
            break
          case 'bagi':
            this.result = this.first / this.second
            this.displayFirst = String(this.result)
        this.displayCalc = ''
            break
          default:
            break
       
        }
      }
       this.second = 0
        this.first = this.result
    },
  },
  computed: {},
}
</script>
<style>
.nol {
  padding: 5px 3rem 5px 3rem;
  margin-left: 1rem;
}
</style>
