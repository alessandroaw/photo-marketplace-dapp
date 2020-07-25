<template>
	<footer class="footer bg-dark text-white">
		<div class="container">
			<div class="row">
				<div class="col-md-8">
					<router-link class="logo-font text-white" :to="{ name: 'home', params: {} }">
						DSPM
					</router-link>
					<span class="attribution">
						Proyek tugas akhir
						<a class="text-white" href="https://thinkster.io"
						><i>TheRealSandro</i></a>
					</span>
				</div>
				<div class="col-md-4">
					<drizzle-account units="Ether" :precision="2" />
				</div>
			</div>
		</div>
	</footer>
</template>
