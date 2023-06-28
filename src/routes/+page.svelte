<script lang="ts">
  import DonutChart from '$lib/DonutChart.svelte';
  import { onMount } from 'svelte';

  interface Coin {
    rank: number;
    name: string;
    symbol: string;
    contractAddress: string;
    totalSupply: number;
    totalHolder: number;
    totalSupplyPercentage: number;
  }

  let selectedCoin: Coin = {
    rank: 0,
    symbol: '',
    name: '',
    contractAddress: '',
    totalHolder: 0,
    totalSupply: 0,
    totalSupplyPercentage: 0,
  };

  let tableData: Coin[] = [
    {
            rank: 1,
            symbol: 'USD',
            name: 'John Doe',
            contractAddress: '123 Main St',
            totalHolder: 15,
            totalSupply: 88,
            totalSupplyPercentage: 40.00,
        },
        {
            rank: 2,
            symbol: 'EUR',
            name: 'Jane Smith',
            contractAddress: '456 Elm St',
            totalHolder: 8,
            totalSupply: 564,
            totalSupplyPercentage: 33.00,
        },
        {
            rank: 3,
            symbol: 'GBP',
            name: 'Michael Johnson',
            contractAddress: '789 Oak Ave',
            totalHolder: 4,
            totalSupply: 23,
            totalSupplyPercentage: 50.00,
        },
        {
            rank: 4,
            symbol: 'JPY',
            name: 'Satoshi Nakamoto',
            contractAddress: '321 Pine Rd',
            totalHolder: 333,
            totalSupply: 1,
            totalSupplyPercentage: 50.00,
        },
        {
            rank: 5,
            symbol: 'CAD',
            name: 'Emily Brown',
            contractAddress: '555 Maple Ln',
            totalHolder: 23,
            totalSupply: 3,
            totalSupplyPercentage: 50.00,
        },
        {
            rank: 6,
            symbol: 'AUD',
            name: 'Oliver Wilson',
            contractAddress: '777 Cedar Blvd',
            totalHolder: 55,
            totalSupply: 2,
            totalSupplyPercentage: 50.00,
        },
        {
            rank: 7,
            symbol: 'USD',
            name: 'Sophia Davis',
            contractAddress: '222 Willow Dr',
            totalHolder: 3,
            totalSupply: 75,
            totalSupplyPercentage: 33.00,
        },
        {
            rank: 8,
            symbol: 'EUR',
            name: 'Daniel Martinez',
            contractAddress: '888 Birch Ave',
            totalHolder: 5,
            totalSupply: 62,
            totalSupplyPercentage: 40.00,
        },
        {
            rank: 9,
            symbol: 'GBP',
            name: 'Isabella Thompson',
            contractAddress: '999 Elm St',
            totalHolder: 4,
            totalSupply: 2,
            totalSupplyPercentage: 50.00,
        },
        {
            rank: 10,
            symbol: 'JPY',
            name: 'Mia Anderson',
            contractAddress: '444 Oak Ave',
            totalHolder: 3,
            totalSupply: 68,
            totalSupplyPercentage: 33.00,
        },
        {
            rank: 11,
            symbol: 'CAD',
            name: 'David Rodriguez',
            contractAddress: '111 Maple Ln',
            totalHolder: 5,
            totalSupply: 22,
            totalSupplyPercentage: 40.00,
        },
        {
            rank: 12,
            symbol: 'AUD',
            name: 'Ava Garcia',
            contractAddress: '666 Pine Rd',
            totalHolder: 2,
            totalSupply: 1,
            totalSupplyPercentage: 50.00,
        },
        {
            rank: 13,
            symbol: 'USD',
            name: 'Liam Clark',
            contractAddress: '777 Cedar Blvd',
            totalHolder: 6,
            totalSupply: 3,
            totalSupplyPercentage: 50.00,
        },
        {
            rank: 14,
            symbol: 'EUR',
            name: 'Emma Lewis',
            contractAddress: '555 Willow Dr',
            totalHolder: 10,
            totalSupply: 2,
            totalSupplyPercentage: 50.00,
        },
        {
            rank: 15,
            symbol: 'GBP',
            name: 'Noah Walker',
            contractAddress: '888 Birch Ave',
            totalHolder: 3,
            totalSupply: 1,
            totalSupplyPercentage: 33.00,
        },
  ];

  function sortData() {
    const allTotalSupply = tableData.reduce((accumulator, item) => {
      return accumulator + Number(item.totalSupply);
    }, 0);

    tableData.forEach((item) => {
      item.totalSupplyPercentage = Number(
        ((item.totalSupply / allTotalSupply) * 100).toFixed(5)
      );
    });

    const sortedData = [...tableData].sort(
      (a, b) => b.totalSupply - a.totalSupply
    );

    const updatedData = sortedData.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    tableData = updatedData;
  }

  function handleSave() {
    const existingItemIndex = tableData.findIndex(
      (item) => item.symbol === selectedCoin.symbol
    );

    let newCoin: Coin = {
      rank: 0,
      symbol: selectedCoin.symbol,
      name: selectedCoin.name,
      contractAddress: selectedCoin.contractAddress,
      totalHolder: selectedCoin.totalHolder,
      totalSupply: selectedCoin.totalSupply,
      totalSupplyPercentage: 0,
    };

    if (existingItemIndex !== -1) {
      const updatedData = [...tableData];
      updatedData[existingItemIndex] = newCoin;
      tableData = updatedData;
    } else {
      tableData = [...tableData, newCoin];
    }

    sortData();
  }

  function handleReset() {
    selectedCoin = {
      rank: 0,
      symbol: '',
      name: '',
      contractAddress: '',
      totalHolder: 0,
      totalSupply: 0,
      totalSupplyPercentage: 0,
    };
  }

  function handleEdit(symbol: string) {
    var getCoinFromArray = tableData.find((item) => item.symbol === symbol);
    if (getCoinFromArray !== undefined) {
      selectedCoin = getCoinFromArray;
    }
  }

  onMount(() => {

  });
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
            <label class="input-title" for="name-input">Name</label>
            <input
              class="input-box"
              type="text"
              placeholder="Name"
              id="name-input"
              bind:value={selectedCoin.name}
            />
          </div>
          <div style="display: flex;">
            <label class="input-title" for="symbol-input">Symbol</label>
            <input
              class="input-box"
              type="text"
              placeholder="Symbol"
              id="symbol-input"
              bind:value={selectedCoin.symbol}
            />
          </div>
          <div style="display: flex;">
            <label class="input-title" for="ca-input">Contract Address</label>
            <input
              class="input-box"
              type="text"
              placeholder="Contract Address"
              id="ca-input"
              bind:value={selectedCoin.contractAddress}
            />
          </div>
          <div style="display: flex;">
            <label class="input-title" for="supply-input">Total Supply</label>
            <input
              class="input-box"
              type="text"
              placeholder="Total Supply"
              id="supply-input"
              bind:value={selectedCoin.totalSupply}
            />
          </div>
          <div style="display: flex;">
            <label class="input-title" for="holder-input">Total Holders</label>
            <input
              class="input-box"
              type="text"
              placeholder="Total Holders"
              id="holder-input"
              bind:value={selectedCoin.totalHolder}
            />
          </div>
          <div style="display: flex;">
            <label class="input-title" for="" />
            <div>
              <button
                class="btn btn-primary"
                style="margin-right: 15px;"
                on:click={handleSave}>Save</button
              >
              <button class="btn btn-secondary" on:click={handleReset}
                >Reset</button
              >
            </div>
          </div>
        </div>
      </form>
      <div style="flex-grow: 1;" />
      <div class="pie-chart">
        <p class="title">Token Statistics by Total Supply</p>
        <DonutChart />
      </div>
      <div style="flex-grow: 1;" />
    </div>
    <hr />
    <div class="table-container">
      <div style="display: flex; flex-direction: column;">
        <div>
          <table>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Symbol</th>
                <th scope="col">Name</th>
                <th scope="col">Contract Address</th>
                <th scope="col">Total Holders</th>
                <th scope="col">Total Supply</th>
                <th scope="col">Total Supply %</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {#each tableData as row}
                <tr>
                  <td>{row.rank}</td>
                  <td>{row.symbol}</td>
                  <td>{row.name}</td>
                  <td>{row.contractAddress}</td>
                  <td>{row.totalHolder}</td>
                  <td>{row.totalSupply}</td>
                  <td>{row.totalSupplyPercentage.toFixed(5)}</td>
                  <td
                    ><button on:click={() => handleEdit(row.symbol)}
                      >Edit</button
                    ></td
                  >
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <!-- <div style={{ alignSelf: "center" }}>
              <nav aria-label="Page navigation example">
                  <ul class="pagination">
                      <li class={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button class="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                      </li>
                      {Array.from(Array(totalPages).keys()).map((page) => (
                          <li key={page + 1} class={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                              <button class="page-link" href="#" onClick={() => handlePageChange(page + 1)}>
                                  {page + 1}
                              </button>
                          </li>
                      ))}
                      <li class={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button class="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                      </li>
                  </ul>
              </nav>
          </div> -->
      </div>
    </div>
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
