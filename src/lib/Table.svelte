<script lang="ts">
    export let columns: string[];
    export let data: Record<string, any>[];
</script>

<div class="table-container">
    <div style="display: flex; flex-direction: column;">
        <div>
            <table>
                <thead>
                    <tr>
                        {#each columns as column}
                            <th>{column}</th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each data as row}
                        <tr>
                            {#each columns as column}
                                <td>{row[column]}</td>
                            {/each}
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