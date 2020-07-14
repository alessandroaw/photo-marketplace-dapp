<template>
	<main role="main">
        <section class="jumbotron mb-0">
            <div class="container text-center">
                <h1>Cari Foto Stok</h1>
                <!-- <p class="lead text-muted">Cari foto yang anda inginkan</p> -->
                <form class="form-group d-flex justify-content-center">
                    <input class="form-control" style="width: 50%"
					placeholder="Kata kunci" type="search" name="search" id="search">
                </form>
                <div class="d-flex justify-content-center">
                    <a href="#" class="btn btn-secondary mx-1">Alam</a>
                    <a href="#" class="btn btn-secondary mx-1">Arsitektur</a>
                    <a href="#" class="btn btn-secondary mx-1">Teknologi</a>
                    <a href="#" class="btn btn-secondary mx-1">Industri</a>
                    <a href="#" class="btn btn-secondary mx-1">Kesehatan</a>
                </div>
            </div>
        </section>

        <section class="album py-5 bg-light">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-sm-12">
                        <div class="card mb-4 shadow-sm">
                            <img src="assets/laptop.jpg" alt="" class="card-img-top img-fluid">
                            <div class="card-body">
                                <p class="card-text">
                                    An image of laptop in wooden desk.
                                </p>
                                <p>
                                    <a href="#" class="btn btn-info py-0 px-1 mb-1">laptop</a>
                                    <a href="#" class="btn btn-info py-0 px-1 mb-1">coffee</a>
                                    <a href="#" class="btn btn-info py-0 px-1 mb-1">wood</a>
                                    <a href="#" class="btn btn-info py-0 px-1 mb-1">table</a>
                                    <a href="#" class="btn btn-info py-0 px-1 mb-1">work</a>
                                    <a href="#" class="btn btn-info py-0 px-1 mb-1">glassess</a>
                                </p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <strong class="text-muted">Rp 10.000</strong>
                                    <button class="btn btn-outline-success">Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12">
                        <div class="card mb-4 shadow-sm">
                            <img src="assets/laptop.jpg" alt="" class="card-img-top img-fluid">
                            <div class="card-body">
                                <p class="card-text">
                                    An image of laptop in wooden desk.
                                </p>
                                <p>
                                    <a href="#" class="btn btn-info py-0 px-1 mb-1">laptop</a>
                                    <a href="#" class="btn btn-info py-0 px-1 mb-1">coffee</a>
                                    <a href="#" class="btn btn-info py-0 px-1 mb-1">wood</a>
                                    <a href="#" class="btn btn-info py-0 px-1 mb-1">table</a>
                                    <a href="#" class="btn btn-info py-0 px-1 mb-1">work</a>
                                    <a href="#" class="btn btn-info py-0 px-1 mb-1">glassess</a>
                                </p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <strong class="text-muted">Rp 10.000</strong>
                                    <button class="btn btn-success disabled">Dipesan</button>
                                </div>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
        </section>
    </main>
</template>
