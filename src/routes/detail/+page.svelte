<svelte:head>
    <title>Detail</title>
	<meta name="description" content="Detail" />
</svelte:head>

<section>
    <div class="detail-container">
        <div style="display: flex; flex-direction: column;">
            <div style="display: flex; margin: 1% 1%;">
                <button type="button" class="btn btn-secondary">Back</button>
                <p class="title">Save / Update Token</p>
            </div>
            <div style="display: flex; flex-direction: column;">
                <!-- <div style={{ display: "flex" }}>
                    <label class="input-title">Price: </label>
                    <label class="input-title" style={{ fontWeight: "bold" }}>$ {location.state.state.price }</label>
                </div>
                <hr style={{ margin: "10px 50px"}} />
                <div style={{ display: "flex" }}>
                    <label class="input-title">Total Supply:</label>
                    <label class="input-title">{location.state.state.totalSupply}</label>
                </div>
                <hr style={{ margin: "10px 50px" }} />
                <div style={{ display: "flex" }}>
                    <label class="input-title">Total Holders:</label>
                    <label class="input-title">{location.state.state.totalHolder}</label>
                </div>
                <hr style={{ margin: "10px 50px" }} />
                <div style={{ display: "flex" }}>
                    <label class="input-title">Name:</label>
                    <label class="input-title">{location.state.state.name}</label>
                </div> -->
            </div>
        </div>
    </div>
</section>

<style>
    .detail-container {
    width: auto;
    height: auto;
    margin: 1%;
    padding: 2%;
    border-width: 1px;
    border-style: solid;
    border-color: lightgray;
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
    margin: 0 5%;
    display: flex;
    align-self: center;
}

</style>