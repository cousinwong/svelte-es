<script lang="ts">
  import DonutChart from '$lib/DonutChart.svelte';
  import { onMount } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import { selectedCoin, coinData, type Coin } from './coin-store';


  coinData.set([
    {
      rank: 1,
      symbol: 'USD',
      name: 'John Doe',
      contractAddress: '123 Main St',
      totalHolder: 15,
      totalSupply: 88,
      totalSupplyPercentage: 40.0,
      price: 352.67,
    },
    {
      rank: 2,
      symbol: 'EUR',
      name: 'Jane Smith',
      contractAddress: '456 Elm St',
      totalHolder: 8,
      totalSupply: 564,
      totalSupplyPercentage: 33.0,
      price: 302.00,
    },
    {
      rank: 3,
      symbol: 'GBP',
      name: 'Michael Johnson',
      contractAddress: '789 Oak Ave',
      totalHolder: 4,
      totalSupply: 23,
      totalSupplyPercentage: 50.0,
      price: 671.00,
    },
    {
      rank: 4,
      symbol: 'JPY',
      name: 'Satoshi Nakamoto',
      contractAddress: '321 Pine Rd',
      totalHolder: 333,
      totalSupply: 1,
      totalSupplyPercentage: 50.0,
      price: 23.75,
    },
    {
      rank: 5,
      symbol: 'CAD',
      name: 'Emily Brown',
      contractAddress: '555 Maple Ln',
      totalHolder: 23,
      totalSupply: 3,
      totalSupplyPercentage: 50.0,
      price: 35.66,
    },
    {
      rank: 6,
      symbol: 'AUD',
      name: 'Oliver Wilson',
      contractAddress: '777 Cedar Blvd',
      totalHolder: 55,
      totalSupply: 2,
      totalSupplyPercentage: 50.0,
      price: 220.10,
    },
    {
      rank: 7,
      symbol: 'NGR',
      name: 'Sophia Davis',
      contractAddress: '222 Willow Dr',
      totalHolder: 3,
      totalSupply: 75,
      totalSupplyPercentage: 33.0,
      price: 5.23,
    },
    {
      rank: 8,
      symbol: 'SGD',
      name: 'Daniel Martinez',
      contractAddress: '888 Birch Ave',
      totalHolder: 5,
      totalSupply: 62,
      totalSupplyPercentage: 40.0,
      price: 76.01,
    },
    {
      rank: 9,
      symbol: 'MYR',
      name: 'Isabella Thompson',
      contractAddress: '999 Elm St',
      totalHolder: 4,
      totalSupply: 2,
      totalSupplyPercentage: 50.0,
      price: 32.12,
    },
    {
      rank: 10,
      symbol: 'IND',
      name: 'Mia Anderson',
      contractAddress: '444 Oak Ave',
      totalHolder: 3,
      totalSupply: 68,
      totalSupplyPercentage: 33.0,
      price: 0.20,
    },
    {
      rank: 11,
      symbol: 'RMB',
      name: 'David Rodriguez',
      contractAddress: '111 Maple Ln',
      totalHolder: 5,
      totalSupply: 22,
      totalSupplyPercentage: 40.0,
      price: 12.34,
    },
    {
      rank: 12,
      symbol: 'PIL',
      name: 'Ava Garcia',
      contractAddress: '666 Pine Rd',
      totalHolder: 2,
      totalSupply: 1,
      totalSupplyPercentage: 50.0,
      price: 98.00,
    },
    {
      rank: 13,
      symbol: 'LCR',
      name: 'Liam Clark',
      contractAddress: '777 Cedar Blvd',
      totalHolder: 6,
      totalSupply: 3,
      totalSupplyPercentage: 50.0,
      price: 102.55,
    },
    {
      rank: 14,
      symbol: 'ELW',
      name: 'Emma Lewis',
      contractAddress: '555 Willow Dr',
      totalHolder: 10,
      totalSupply: 2,
      totalSupplyPercentage: 50.0,
      price: 52.23,
    },
    {
      rank: 15,
      symbol: 'NWK',
      name: 'Noah Walker',
      contractAddress: '888 Birch Ave',
      totalHolder: 3,
      totalSupply: 1,
      totalSupplyPercentage: 33.0,
      price: 123.45,
    },
  ]);

  const itemsPerPage = 10;

  const currentPage: Writable<number> = writable(1);
  let displayData: Coin[] = [];

  function updateDisplayedData() {
    const start: number = ($currentPage - 1) * itemsPerPage;
    const end: number = start + itemsPerPage;
    displayData = $coinData.slice(start, end);
  }

  function goToPage(page: number): void {
    currentPage.set(page);
    updateDisplayedData();
    scrollToComponent('pagination-component');
  }

  function sortData() {
    const allTotalSupply = $coinData.reduce((accumulator, item) => {
      return accumulator + Number(item.totalSupply);
    }, 0);

    $coinData.forEach((item) => {
      item.totalSupplyPercentage = Number(
        ((item.totalSupply / allTotalSupply) * 100).toFixed(5)
      );
    });

    const sortedData = [...$coinData].sort(
      (a, b) => b.totalSupply - a.totalSupply
    );

    const updatedData = sortedData.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    $coinData = updatedData;

    updateDisplayedData();
  }

  function handleSave() {
    const existingItemIndex = $coinData.findIndex(
      (item) => item.symbol === $selectedCoin.symbol
    );

    let newCoin: Coin = {
      rank: 0,
      symbol: $selectedCoin.symbol,
      name: $selectedCoin.name,
      contractAddress: $selectedCoin.contractAddress,
      totalHolder: $selectedCoin.totalHolder,
      totalSupply: $selectedCoin.totalSupply,
      totalSupplyPercentage: 0,
      price: 0.00,
    };

    if (existingItemIndex !== -1) {
      const updatedData = [...$coinData];
      updatedData[existingItemIndex] = newCoin;
      $coinData = updatedData;
    } else {
      $coinData = [...$coinData, newCoin];
    }

    sortData();
  }

  function handleReset() {
    $selectedCoin = {
      rank: 0,
      symbol: '',
      name: '',
      contractAddress: '',
      totalHolder: 0,
      totalSupply: 0,
      totalSupplyPercentage: 0,
      price: 0.00,
    };
  }

  function handleEdit(symbol: string) {
    var getCoinFromArray = $coinData.find((item) => item.symbol === symbol);
    if (getCoinFromArray !== undefined) {
      $selectedCoin = getCoinFromArray;
    }
    scrollToComponent('input-component');
  }

  function exportToCSV(): void {
    const csvContent: string =
      'data:text/csv;charset=utf-8,' +
      $coinData.map((item) => Object.values(item).join(',')).join('\n');

    const encodedUri: string = encodeURI(csvContent);
    const link: HTMLAnchorElement = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'table.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function scrollToComponent(componentId: string): void {
    const component: HTMLElement | null = document.getElementById(componentId);
    if (component) {
      component.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onMount(() => {
    sortData();
  });
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="ES_Assessment" />
</svelte:head>

<section>
  <div class="home-container">
    <div class="input-chart-container" id="input-component">
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
              bind:value={$selectedCoin.name}
            />
          </div>
          <div style="display: flex;">
            <label class="input-title" for="symbol-input">Symbol</label>
            <input
              class="input-box"
              type="text"
              placeholder="Symbol"
              id="symbol-input"
              bind:value={$selectedCoin.symbol}
            />
          </div>
          <div style="display: flex;">
            <label class="input-title" for="ca-input">Contract Address</label>
            <input
              class="input-box"
              type="text"
              placeholder="Contract Address"
              id="ca-input"
              bind:value={$selectedCoin.contractAddress}
            />
          </div>
          <div style="display: flex;">
            <label class="input-title" for="supply-input">Total Supply</label>
            <input
              class="input-box"
              type="text"
              placeholder="Total Supply"
              id="supply-input"
              bind:value={$selectedCoin.totalSupply}
            />
          </div>
          <div style="display: flex;">
            <label class="input-title" for="holder-input">Total Holders</label>
            <input
              class="input-box"
              type="text"
              placeholder="Total Holders"
              id="holder-input"
              bind:value={$selectedCoin.totalHolder}
            />
          </div>
          <div style="display: flex;">
            <label class="input-title" for="" />
            <div>
              <button
                class="save-btn"
                style="margin-right: 15px;"
                on:click={handleSave}>Save</button
              >
              <button class="reset-btn" on:click={handleReset}
                >Reset</button
              >
            </div>
          </div>
        </div>
      </form>
      <div class="pie-chart">
        <p class="title">Token Statistics by Total Supply</p>
        <DonutChart bind:chartData={$coinData} labelIndex={1} dataIndex={5} />
      </div>
    </div>
    <hr />
    <div class="table-container">
      <div style="display: flex; flex-direction: column; width: 100%;">
        <div>
          <!-- The Table -->
          <table cellspacing=0>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Symbol</th>
                <th scope="col">Name</th>
                <th scope="col">Contract Address</th>
                <th scope="col">Total Holders</th>
                <th scope="col">Total Supply</th>
                <th scope="col">Total Supply %</th>
                <th scope="col"
                  ><button class="export-button" on:click={exportToCSV}
                    >Export to CSV</button
                  ></th
                >
              </tr>
            </thead>
            <tbody>
              {#each displayData as row}
                <tr>
                  <td>{row.rank}</td>
                  <td><a href="/detail?symbol={row.symbol}">{row.symbol}</a></td>
                  <td>{row.name}</td>
                  <td>{row.contractAddress}</td>
                  <td>{row.totalHolder}</td>
                  <td>{row.totalSupply}</td>
                  <td>{row.totalSupplyPercentage.toFixed(5)}</td>
                  <td>
                    <div class="edit-button">
                      <button on:click={() => handleEdit(row.symbol)}
                        >Edit</button
                      >
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <div class="pagination"  id="pagination-component">
          <!-- Previous page button -->
          <button
            on:click={() => goToPage($currentPage - 1)}
            disabled={$currentPage === 1}>Previous</button
          >

          <!-- Page numbers -->
          {#each Array(Math.ceil($coinData.length / itemsPerPage))
            .fill(undefined)
            .map((_, index) => index + 1) as $pageNumber}
            <button
              on:click={() => goToPage($pageNumber)}
              class:selected={$pageNumber === $currentPage}
            >
              {$pageNumber}
            </button>
          {/each}

          <!-- Next page button -->
          <button
            on:click={() => goToPage($currentPage + 1)}
            disabled={$currentPage ===
              Math.ceil($coinData.length / itemsPerPage)}>Next</button
          >
        </div>
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
    flex-grow: 1;
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
    flex-grow: 1;
  }

  .title {
    font-weight: bold;
  }

  .save-btn {
    padding: 0.5rem 1rem;
    margin: 0.25rem;
    border-width: 0;
    color: white;
    background-color: cornflowerblue;
    border-radius: 0.25rem;
  }

  .reset-btn {
    padding: 0.5rem 1rem;
    margin: 0.25rem;
    border-width: 0;
    background-color: gainsboro;
    border-radius: 0.25rem;
  }

  .export-button {
    border-width: 0.0625rem;
    margin: 0.25rem;
    padding: 0.375rem 1rem;
    background-color: gainsboro;
    border-radius: 5rem;
  }

  .edit-button {
    display: flex;
    justify-content: center;
  }

  .edit-button button {
    padding: 0.25rem 1rem;
    margin: 0.25rem;
    border-width: 0;
    background-color: transparent;
    color: cornflowerblue;
  }

  .pagination {
    align-self: center;
  }

  .pagination button {
    padding: 0.5rem 1rem;
    margin: 0.25rem;
    border-width: 0;
    background-color: gainsboro;
  }
  
  .pagination :first-child {
    border-top-left-radius: 5rem;
    border-bottom-left-radius: 5rem;
    
  }

  .pagination :last-child {
    border-top-right-radius: 5rem;
    border-bottom-right-radius: 5rem;
  }

  table {
    width: 100%;
    padding: 5px;
    margin-bottom: 2rem;
  }

  th {
    padding: 1% 0.125rem;
    word-wrap: normal;
    border-bottom: 1px solid;
    text-align: center;
  }

  td {
    padding: 0.125rem;
    word-wrap: normal;
    border-bottom: 1px solid;
    text-align: center;
  }

  button {
    cursor: pointer;
  }

  table a {
    color: cornflowerblue;
  }
</style>
