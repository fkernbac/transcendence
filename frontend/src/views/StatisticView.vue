<template>
  <div class="centered">
    <div class="container-ms">
      <div>
        <h2>{{ $t("Milestones") }}</h2>
        <div class="ms-row">
          <div class="box">
            <div class="headline">{{ $t("LongestGame") }}</div>
            <div class="content">
              <div class="image-table">
                <div class="image_history">
                  <img
                    v-if="milestones?.longestGame"
                    :src="`avatars/${milestones?.longestGame?.l_avatar_id}${milestones?.longestGame?.l_avatar_mime_type}`"
                    alt="Avatar"
                  />
                </div>
              </div>
              <div v-if="milestones?.longestGame" class="name-table-left">
                {{ milestones?.longestGame?.l_nickname }}
              </div>
              <div class="score-table-center">
                <b>:</b>
              </div>
              <div v-if="milestones?.longestGame" class="name-table-right">
                {{ milestones?.longestGame?.r_nickname }}
              </div>
              <div class="image-table">
                <div class="image_history">
                  <img
                    v-if="milestones?.longestGame"
                    :src="`avatars/${milestones?.longestGame?.r_avatar_id}${milestones?.longestGame?.r_avatar_mime_type}`"
                    alt="Avatar"
                  />
                </div>
              </div>
              <div v-if="milestones?.longestGame" class="value">
                {{ milestones?.longestGame?.duration }}
              </div>
            </div>
          </div>
          <div class="box">
            <div class="headline">{{ $t("LongestBreak") }}</div>
            <div class="content">
              <div class="image-table">
                <div class="image_history">
                  <img
                    v-if="milestones?.longestBreak"
                    :src="`avatars/${milestones?.longestBreak?.l_user?.avatar?.id}${milestones?.longestBreak?.l_user?.avatar?.mime_type}`"
                    alt="Avatar"
                  />
                </div>
              </div>
              <div v-if="milestones?.longestBreak" class="name-table-left">
                {{ milestones?.longestBreak?.l_user?.nickname }}
              </div>
              <div class="score-table-center">
                <b>:</b>
              </div>
              <div v-if="milestones?.longestBreak" class="name-table-right">
                {{ milestones?.longestBreak?.r_user?.nickname }}
              </div>
              <div class="image-table">
                <div class="image_history">
                  <img
                    v-if="milestones?.longestBreak"
                    :src="`avatars/${milestones?.longestBreak?.r_user?.avatar?.id}${milestones?.longestBreak?.r_user?.avatar?.mime_type}`"
                    alt="Avatar"
                  />
                </div>
              </div>
              <div v-if="milestones?.longestBreak" class="value">
                {{ milestones?.longestBreak?.longest_break }} Contacts
              </div>
            </div>
          </div>
        </div>
        <div class="ms-row">
          <div class="box">
            <div class="headline">{{ $t("MostContacts") }}</div>
            <div class="content">
              <div class="image-table">
                <div class="image_history">
                  <img
                    v-if="milestones?.mostContacts"
                    :src="`avatars/${milestones?.mostContacts?.avatar_id}${milestones?.mostContacts?.avatar_mime_type}`"
                    alt="Avatar"
                  />
                </div>
              </div>
              <div v-if="milestones?.mostContacts" class="name-table-left">
                {{ milestones?.mostContacts?.nickname }}
              </div>
              <div v-if="milestones?.mostContacts" class="value">
                {{ milestones?.mostContacts?.total_contacts }}
              </div>
            </div>
          </div>
          <div class="box">
            <div class="headline">{{ $t("ShortestGame") }}</div>
            <div class="content">
              <div class="image-table">
                <div class="image_history">
                  <img
                    v-if="milestones?.shortestGame"
                    :src="`avatars/${milestones?.shortestGame?.l_avatar_id}${milestones?.shortestGame?.l_avatar_mime_type}`"
                    alt="Avatar"
                  />
                </div>
              </div>
              <div v-if="milestones?.shortestGame" class="name-table-left">
                {{ milestones?.shortestGame?.l_nickname }}
              </div>
              <div class="score-table-center">
                <b>:</b>
              </div>
              <div v-if="milestones?.shortestGame" class="name-table-right">
                {{ milestones?.shortestGame?.r_nickname }}
              </div>
              <div class="image-table">
                <div class="image_history">
                  <img
                    v-if="milestones?.shortestGame"
                    :src="`avatars/${milestones?.shortestGame?.r_avatar_id}${milestones?.shortestGame?.r_avatar_mime_type}`"
                    alt="Avatar"
                  />
                </div>
              </div>
              <div v-if="milestones?.shortestGame" class="value">
                {{ milestones?.shortestGame?.duration }}
              </div>
            </div>
          </div>
        </div>
        <div class="ms-row">
          <div class="box">
            <div class="headline">{{ $t("HighestWin") }}</div>
            <div class="content">
              <div class="image-table">
                <div class="image_history">
                  <img
                    v-if="milestones?.highestWin"
                    :src="`avatars/${milestones?.highestWin?.avatar_id}${milestones?.highestWin?.avatar_mime_type}`"
                    alt="Avatar"
                  />
                </div>
              </div>
              <div v-if="milestones?.highestWin" class="name-table-left">
                {{ milestones?.highestWin?.nickname }}
              </div>
              <div v-if="milestones?.highestWin" class="value">
                +{{ milestones?.highestWin?.max_win_diff }}
              </div>
            </div>
          </div>
          <div class="box">
            <div class="headline">{{ $t("LeastContacts") }}</div>
            <div class="content">
              <div class="image-table">
                <div class="image_history">
                  <img
                    v-if="milestones?.leastContacts"
                    :src="`avatars/${milestones?.leastContacts?.avatar_id}${milestones?.leastContacts?.avatar_mime_type}`"
                    alt="Avatar"
                  />
                </div>
              </div>
              <div v-if="milestones?.leastContacts" class="name-table-left">
                {{ milestones?.leastContacts?.nickname }}
              </div>
              <div v-if="milestones?.leastContacts" class="value">
                {{ milestones?.leastContacts?.total_contacts }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3>{{ $t("Statistics") }}</h3>
      <table class="table table-bordered transparent-table">
        <thead>
          <tr>
            <th @click="sortTable('nickname')">{{ $t("User") }}</th>
            <th @click="sortTable('matches')">{{ $t("Matches") }}</th>
            <th @click="sortTable('wins')">{{ $t("Wins") }}</th>
            <th @click="sortTable('losses')">{{ $t("Losses") }}</th>
            <th @click="sortTable('kd')">K/D</th>
            <th @click="sortTable('tourmatches')">
              {{ $t("TournamentMatches") }}
            </th>
            <th @click="sortTable('tourwins')">{{ $t("TournamentWins") }}</th>
            <th @click="sortTable('contacts[0]?.total_contacts')">
              {{ $t("ballContacts") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Iteriere über die Statistikdaten und zeige sie in der Tabelle an -->
          <tr v-for="row in sortedStatistics" :key="row?.userId">
            <td>{{ row?.nickname }}</td>
            <td>{{ row?.matches }}</td>
            <td>{{ row?.wins }}</td>
            <td>{{ row?.losses }}</td>
            <td>{{ calcKD(row?.wins, row?.losses)?.toFixed(2) }}</td>
            <td>{{ row?.tourmatches }}</td>
            <td>{{ row?.tourwins }}</td>
            <td>{{ row?.contacts[0]?.total_contacts }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3>{{ $t("Graphs") }}</h3>
    <p style="text-align: center; color: rgb(219, 219, 227)">
      {{ $t("graphDescription") }}
    </p>
    <div class="graph-wrapper">
      <div class="graph-row">
        <div class="graph-container">
          <canvas id="championsBoard" class="chart-canvas"></canvas>
        </div>
      </div>
      <p style="text-align: center; color: rgb(219, 219, 227)">
        {{ $t("ballContacts") }}
      </p>
      <div class="graph-row">
        <div class="graph-container">
          <canvas id="gameType" class="chart-canvas"></canvas>
        </div>
      </div>
      <!-- <div class="graph-row">
        <div class="graph-container">
          <canvas id="kdChart" class="chart-canvas"></canvas>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      milestones: null,
      statistics: null,
      sortKey: "wins",
      sortDirection: "desc",
      userStatistics: [],
    };
  },

  mounted() {
    this.fetchMilestones();
    this.fetchStats();
  },

  computed: {
    sortedStatistics() {
      if (!this.statistics) return [];

      const modifier = this.sortDirection === "desc" ? -1 : 1;

      return this.statistics.slice().sort((a, b) => {
        if (this.sortKey === "nickname") {
          const aValue = a[this.sortKey].toLowerCase();
          const bValue = b[this.sortKey].toLowerCase();
          return modifier * aValue.localeCompare(bValue);
        }
        // Handle "kd" separately
        if (this.sortKey === "kd") {
          const aValue = this.calcKD(a.wins, a.losses).toFixed(2);
          const bValue = this.calcKD(b.wins, b.losses).toFixed(2);
          return modifier * (aValue - bValue);
        }
        // Handle "ballContacts" separately
        if (this.sortKey === "ballContacts") {
          const aValue = a.contacts.reduce(
            (total, contact) => total + contact.total_contacts,
            0,
          );
          const bValue = b.contacts.reduce(
            (total, contact) => total + contact.total_contacts,
            0,
          );
          return modifier * (aValue - bValue);
        }
        // Handle other keys
        const aValue = this.getValue(a, this.sortKey);
        const bValue = this.getValue(b, this.sortKey);
        return modifier * (aValue - bValue);
      });
    },
  },

  methods: {
    sortTable(key) {
      if (key === this.sortKey) {
        this.sortDirection = this.sortDirection === "desc" ? "asc" : "desc";
      } else {
        this.sortKey = key;
        this.sortDirection = key === "nickname" ? "asc" : "desc";
      }
    },

    getValue(obj, key) {
      const keys = key.split(".");
      return keys.reduce(
        (acc, k) => (acc && acc[k] !== undefined ? acc[k] : null),
        obj,
      );
    },

    calcKD(wins, losses) {
      let kd = wins / losses;
      if (isNaN(kd) || !isFinite(kd)) {
        kd = 0;
      }
      return kd;
    },

    convertContacts(data) {
      return data.map((user) => {
        // Handle "ballContacts" separately
        if (user.contacts && user.contacts.length > 0) {
          user.ballContacts = user.contacts.reduce(
            (total, contact) => total + contact.total_contacts,
            0,
          );
        } else {
          user.ballContacts = 0;
        }
        return user;
      });
    },

    async fetchMilestones() {
      try {
        const response = await fetch(
          `https://${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_BACKEND_PORT}/data/milestones`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          this.milestones = data;
        } else {
          console.error("Failed to fetch milestones");
        }
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    },

    async fetchStats() {
      try {
        const response = await fetch(
          `https://${process.env.VUE_APP_SERVER_IP}:${process.env.VUE_APP_BACKEND_PORT}/data/allstats`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          this.statistics = this.convertContacts(data);
          await this.fetchChartData();
        } else {
          console.error("Failed to fetch statistics");
        }
      } catch (error) {
        console.error("Error fetching user history:", error);
      }
    },

    async fetchChartData() {
      this.userStatistics = this.statistics;
      this.userStatistics.sort((a, b) => b.wins - a.wins);
      await this.renderBallContacts();
      // await this.renderKD();
      await this.renderWinLoss();
    },

    async renderBallContacts() {
      const nicknameDT = this.userStatistics.map((user) => user.nickname);
      const contactsDT = this.userStatistics.map(
        (user) => user.contacts[0].total_contacts,
      );
      const doughnut = document.getElementById("gameType").getContext("2d");
      Chart.defaults.color = "#dbdbe3";
      const doughnutData = {
        labels: nicknameDT,
        datasets: [
          {
            data: contactsDT,
            backgroundColor: [
              "rgb(5, 155, 255)",
              "rgb(6, 8, 139)",
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 206, 86)",
              "rgb(75, 192, 192)",
              "rgb(153, 102, 255)",
              "rgb(255, 159, 64)",
              "rgb(220, 20, 60)",
              "rgb(0, 128, 128)",
              "rgb(0, 0, 139)",
              "rgb(139, 0, 139)",
              "rgb(255, 140, 0)",
              "rgb(218, 165, 32)",
              "rgb(107, 142, 35)",
              "rgb(70, 130, 180)",
              "rgb(255, 165, 0)",
              "rgb(128, 0, 0)",
              "rgb(0, 0, 128)",
              "rgb(0, 128, 0)",
              "rgb(128, 128, 0)",
              "rgb(173, 216, 230)",
              "rgb(255, 192, 203)",
              "rgb(255, 255, 0)",
              "rgb(255, 0, 255)",
              "rgb(0, 255, 255)",
              "rgb(255, 255, 255)",
              "rgb(0, 0, 0)",
              "rgb(128, 128, 128)",
              "rgb(192, 192, 192)",
            ],
            hoverOffset: 1,
            borderWidth: 0,
          },
        ],
      };
      new Chart(doughnut, {
        type: "doughnut",
        data: doughnutData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          title: {
            display: true,
            text: this.$t("ballContacts"),
            font: {
              size: 16,
              weight: "bold",
            },
          },
        },
      });
    },

    // async renderKD() {
    //   const nicknames = this.userStatistics.map((user) => user.nickname);
    //   const kd = this.userStatistics.map((user) => user.wins / user.losses);
    //   kd.forEach((value, index, array) => {
    //     array[index] = value < 1 ? value * -1 : value;
    //     if (isNaN(array[index]) || !isFinite(array[index])) {
    //       array[index] = 0.0;
    //     }
    //   });
    //   const kdChart = document.getElementById("kdChart").getContext("2d");
    //   new Chart(kdChart, {
    //     type: "bar",
    //     data: {
    //       labels: nicknames,
    //       datasets: [
    //         {
    //           label: "K/D",
    //           data: kd,
    //           backgroundColor: "rgba(75,192,192,0.7)",
    //           borderColor: "rgba(75,192,192,1)",
    //           borderWidth: 1,
    //         },
    //       ],
    //     },
    //     options: {
    //       responsive: true,
    //       plugins: {
    //         legend: {
    //           display: true,
    //           position: "bottom",
    //         },
    //       },
    //       scales: {
    //         x: {
    //           stacked: true,
    //           title: {
    //             display: true,
    //           },
    //         },
    //         y: {
    //           display: false,
    //           beginAtZero: false,
    //         },
    //       },
    //     },
    //   });
    // },

    async renderWinLoss() {
      const nicknames = this.userStatistics.map((user) => user.nickname);
      const wins = this.userStatistics.map((user) => user.wins);
      const losses = this.userStatistics.map((user) => user.losses);
      const histogram = document
        .getElementById("championsBoard")
        .getContext("2d");
      Chart.defaults.color = "#dbdbe3";

      new Chart(histogram, {
        type: "bar",
        data: {
          labels: nicknames,
          datasets: [
            {
              label: this.$t("Wins"),
              data: wins,
              backgroundColor: "rgba(0,115,0,0.5)",
            },
            {
              label: this.$t("Losses"),
              data: losses,
              backgroundColor: "rgba(230,0,0,0.5)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
          },
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
              },
            },
            y: {
              display: true,
              stacked: true,
              title: {
                display: true,
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.ms-row {
  display: flex;
}

h2 {
  text-align: center;
}

h3 {
  margin-top: 2em;
  text-align: center;
}

.box {
  flex: 1;
  height: 6em;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5em;
  display: flex;
  padding: 0.5em;
  margin: 0.5em;
  flex-direction: column;
}

.content {
  display: flex;
}

.headline {
  width: 100%;
  margin-bottom: 0.5em;
}

.name-table-left {
  flex: 2;
  text-align: left;
  padding: 0 1em;
  display: flex;
  align-items: center;
}

.name-table-right {
  flex: 2;
  text-align: right;
  padding: 0 1em;
  display: flex;
  align-items: center;
}

.score-table-center {
  margin: 0 0.5em;
  display: flex;
  align-items: center;
}

.value {
  flex: 2;
  text-align: right;
  display: flex;
  align-items: center;
}

.image-table {
  width: 48px;
}

.image_history {
  width: 48px;
  height: 48px;
  overflow: hidden;
  display: inline-block;
  position: relative;
}

.image_history img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
}

.container-ms {
  width: 100%;
  height: 80%;
}

.centered {
  align-items: center;
  margin: 0 15%;
  color: rgb(217, 217, 229);
  margin-top: 4em;
}

.transparent-table {
  background: transparent;
  border-collapse: collapse;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
}

.transparent-table td,
.transparent-table th {
  background-color: rgba(17, 9, 69, 0.237);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #95b4f7;
}

.transparent-table th {
  color: #ffe600c8;
}

.transparent-table thead tr:first-child th {
  text-transform: uppercase;
}

@media screen and (max-width: 800px) {
  .transparent-table td,
  .transparent-table th {
    width: 100% / 6;
  }
}

@media screen and (min-width: 800px) {
  .transparent-table td,
  .transparent-table th {
    width: 100% / 6;
  }
}

.graph-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.graph-row {
  width: 100%;
  max-width: 60em;
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
}

.graph-container {
  width: 100%;
  text-align: center;
}

.chart-canvas {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 1em;
}
</style>
