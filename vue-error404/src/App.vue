<!-- What's inside VUE. The container -->
<template>
  <div id="app" class="container">

    <header>
      <h1><i data-lucide=""></i> RFID DASHBOARD</h1>
      <button class="mode-toggle" @click="toggleMode"></button>
    </header>

    <div class="cards">
      <div class="card">
        <i data-lucide="rss"></i>
        <h2>{{ activeCount }}</h2>
        <p>Active RFIDs</p>
      </div>

      <div class="card">
        <i data-lucide="x-circle"></i>
        <h2>{{ inactiveCount }}</h2>
        <p>Inactive RFIDs</p>
      </div>

      <div class="card">
        <i data-lucide="clock"></i>
        <h2>{{ totalCount }}</h2>
        <p>Total Logs</p>
      </div>
    </div>

    <div class="search-bar">
      <i data-lucide="search"></i>
      <input type="text" placeholder="Search RFID..." v-model="searchQuery">
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>RFID</th>
            <th>Status</th>
            <th>Date & Time</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(log, index) in filteredLogs" :key="log.id">
            <td>{{ index + 1 }}</td>
            <td class="rfid-cell">
              {{ log.rfid }}
              <label class="switch">
                <input type="checkbox" :checked="log.status === 1" @click="toggleStatus(log)">
                <span class="slider"></span>
              </label>
            </td>
            <td>
              <span
                :class="{
                  'active-status': log.status === 1,
                  'inactive-status': log.status === 0,
                  'notfound-status': log.status !== 1 && log.status !== 0
                }"
              >
                {{ log.status === 1 ? '1' : log.status === 0 ? '0' : 'RFID Not Found' }}
              </span>
            </td>
            <td>{{ log.date }}</td>
          </tr>

          <tr v-if="filteredLogs.length === 0">
            <td colspan="4" class="no-result">No matching RFID found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <button class="add-btn" @click="addRandomLog">
      <i data-lucide="plus-circle"></i> Add
    </button>

    <div v-if="showToast" class="toast">
      <i data-lucide="check-circle"></i> Updated!
    </div>

  </div>
</template>

<!-- Logic part of VUE -->
<script>
export default {
  data() {
    return {
      rfidLogs: [
        { id: 1, rfid: "49877632", status: 1, date: "11/6/2025, 10:18:09 PM" },
        { id: 2, rfid: "16549173", status: 0, date: "11/6/2025, 10:18:11 PM" },
        { id: 3, rfid: "88697684", status: 2, date: "11/6/2025, 10:20:00 PM" } // Example of RFID Not Found
      ],
      searchQuery: "",
      darkMode: false,
      showToast: false
    }
  },
  computed: {
    filteredLogs() {
      return this.rfidLogs.filter(log =>
        log.rfid.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    activeCount() { return this.rfidLogs.filter(l => l.status === 1).length },
    inactiveCount() { return this.rfidLogs.filter(l => l.status === 0).length },
    totalCount() { return this.rfidLogs.length }
  },
  mounted() { lucide.createIcons() },
  updated() { lucide.createIcons() },
  methods: {
    toggleStatus(log) {
      // Only toggle between 1 and 0, keep "Not Found" (like 2 or undefined) as is
      if (log.status === 1) log.status = 0
      else if (log.status === 0) log.status = 1
      this.showToastMessage()
    },
    addRandomLog() {
      // Randomly assign 1, 0, or unknown
      const randomStatus = Math.random() > 0.66 ? 1 : (Math.random() > 0.33 ? 0 : 2)
      this.rfidLogs.push({
        id: this.rfidLogs.length + 1,
        rfid: Math.floor(Math.random() * 99999999).toString(),
        status: randomStatus,
        date: new Date().toLocaleString()
      })
      this.showToastMessage()
    },
    toggleMode() {
      this.darkMode = !this.darkMode
    },
    showToastMessage() {
      this.showToast = true
      setTimeout(() => this.showToast = false, 1500)
    }
  }
}
</script>

<!-- the css style part to add design on frontend-->
<style src="./assets/styles/style.css"></style>

<style>
/* Optional extra style for 'RFID Not Found' */
.notfound-status {
  color: gray;
  font-weight: bold;
}
</style>
