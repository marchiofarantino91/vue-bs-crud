<template>
  <h1>TODO</h1>
  <hr />
  <router-link class="text-dark nav-link" to="/tools">Previous</router-link>
  <hr />
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="mb-3">
          <label for=" todo" class="form-label">Task Name</label>
          <input
            type="text"
            v-model="displayTask"
            class="form-control"
            placeholder="Task Name"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            id=" todo"
          />
        </div>
        <label for=" link" class="form-label">Link Task</label>
        <div class="input-group flex-nowrap">
          <input
            type="text"
            v-model="displayLink"
            class="form-control"
            placeholder="Link Task"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
      </div>
      <div class="col-8 my-5 text-center">
        <button type="button" class="btn btn-primary" id="todo" @click="saveData">Simpan</button>
      </div>
      <hr />
      <div class="col-md-6 col-12" style="border-right: 1px solid black">
        <h1><i class="fas fa-clipboard-list"></i> TODO</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Task</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="saved.length > 0">
              <tr v-for="(row, index) in saved" :key="'row-' + index">
                <td>{{ index + 1 }}.</td>
                <td>
                  {{ row.desc }} <br />
                  <small
                    ><a class="nav-link p-0" target="_blank" @click="redirect(row.link)">{{ row.link }}</a></small
                  >
                </td>
                <td>
                  <button type="button" class="btn btn-success btn-sm" @click="doneData(index, row)">
                    <i class="fas fa-check-square"></i>
                  </button>
                  <button type="button" class="btn btn-primary btn-sm" @click="editData(index, row)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button type="button" class="btn btn-danger btn-sm" @click="deleteData(index, row)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td> 
              </tr>
            </template>
            <template v-else>
              <td colspan="3" align="center">
                <p style="display: block; text-align: center; padding: 5px; font-size: 14px">No data for table</p>
              </td>
            </template>
          </tbody>
        </table>
      </div>
      <div class="col-12 col-md-6">
        <h1><i class="fas fa-check-square"></i> DONE</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Task</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="done.length > 0">
              <tr v-for="(row, index) in done" :key="'row-' + index">
                <td>{{ index + 1 }}.</td>
                <td>
                  {{ row.desc }} <br />
                  <small
                    ><a class="nav-link p-0" @click="redirect(row.link)">https://{{ row.link }}</a></small
                  >
                </td>
 
              </tr>
            </template>
            <template v-else>
              <td colspan="3" align="center">
                <p style="display: block; text-align: center; padding: 5px; font-size: 14px">No data for table</p>
              </td>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo',
  data() {
    return {
      saved: [],
      done: [],
      displayTask: '',
      displayLink: '',
      state: '',
      edit: {},
      // formatData: {
      //   isSelected: false,
      //   number: 0,
      //   desc: '',
      //   done: false,
      // },
    }
  },
  async created() {
    let saved = JSON.parse(localStorage.getItem('saved'))
    let done = JSON.parse(localStorage.getItem('done'))
    this.saved = saved
    this.done = done ? done : []
    console.log(saved)
  },
  methods: {
    saveData() {
      let formatData = {
        desc: this.displayTask,
        link: this.displayLink,
        done: false,
      }
      if (formatData.desc != '' && this.state == '') {
        this.saved.push(formatData)
        this.displayTask = ''
        this.displayLink = ''
      } else if (formatData.desc != '' && this.state == 'edit') {
        this.saved[this.edit] = formatData
      }
      localStorage.setItem('saved', JSON.stringify(this.saved))
    },
    resetForm() {
      this.displayTask = ''
      this.formatData.number = 0
      this.formatData.isSelected = false
      this.formatData.desc = ''
      this.formatData.done = false
    },
    editData(index, row) {
      this.edit = index
      console.log(this.edit)
      this.displayTask = row.desc
      this.displayLink = row.link
      this.state = 'edit'
      console.log(this.state)
    },
    deleteData(index, row) {
      this.saved.splice(index, 1)
      localStorage.setItem('saved', JSON.stringify(this.saved))
    },
    redirect(query) {
      window.open(query)
    },
    doneData(index, row) {
      this.done.push(this.saved[index])
      this.deleteData(index, row)
      localStorage.setItem('saved', JSON.stringify(this.saved))
      localStorage.setItem('done', JSON.stringify(this.done))
    },
  },
}
</script>
