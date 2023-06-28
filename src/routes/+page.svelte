<script lang="ts">
  import Table from '../lib/Table.svelte';

  let tableColumns: string[] = ['Name', 'Age', 'Email'];
  let tableData: Record<string, any>[] = [
    { Name: 'John Doe', Age: 25, Email: 'johndoe@example.com' },
    { Name: 'Jane Smith', Age: 30, Email: 'janesmith@example.com' },
    // More data objects...
  ];
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="ES_Assessment" />
</svelte:head>

<section>
  <div class="home-container">
    <div class="input-chart-container">
      <form class="input-form">
        <p class="title">Save / Update Token</p>
        <div style="display: flex; flex-direction: column;">
          <div style="display: flex;">
            <label class="input-title">Name</label>
            <input class="input-box" type="text" placeholder="Name" />
          </div>
          <div style="display: flex;">
            <label class="input-title">Symbol</label>
            <input class="input-box" type="text" placeholder="Symbol" />
          </div>
          <div style="display: flex;">
            <label class="input-title">Contract Address</label>
            <input
              class="input-box"
              type="text"
              placeholder="Contract Address"
            />
          </div>
          <div style="display: flex;">
            <label class="input-title">Total Supply</label>
            <input class="input-box" type="text" placeholder="Total Supply" />
          </div>
          <div style="display: flex;">
            <label class="input-title">Total Holders</label>
            <input class="input-box" type="text" placeholder="Total Holders" />
          </div>
          <div style="display: flex;">
            <label class="input-title" />
            <div>
              <button class="btn btn-primary" style="margin-right: 15px;"
                >Save</button
              >
              <button class="btn btn-secondary">Reset</button>
            </div>
          </div>
        </div>
      </form>
      <div style="flex-grow: 1;" />
      <div class="pie-chart">
        <p class="title">Token Statistics by Total Supply</p>
        <!-- <DonutChart /> -->
      </div>
      <div style="flex-grow: 1;" />
    </div>
    <hr />
    <Table columns={tableColumns} data={tableData}/>
  </div>
</section>

<style>
  .home-container {
    width: auto;
    height: auto;
    margin: 1%;
    padding: 2%;
    border-width: 1px;
    border-style: solid;
    border-color: lightgray;
  }

  .input-chart-container {
    display: flex;
  }

  .input-form {
    margin: 1%;
  }

  .input-title {
    padding: 1% 5%;
    text-wrap: nowrap;
    min-width: 200px;
  }

  .input-box {
    margin-bottom: 10px;
    padding: 3px 7px;
  }

  .pie-chart {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    font-weight: bold;
  }
</style>
