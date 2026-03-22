<template>
  <div class="flex min-h-screen bg-zinc-950 text-white">
    <aside class="flex w-48 flex-col gap-4 bg-amber-700 px-5 py-6">
      <RouterLink
        to="/admin/dashboard"
        class="text-base font-medium text-white transition hover:opacity-80"
      >
        Dashboard
      </RouterLink>

      <RouterLink
        to="/admin/products"
        class="text-base font-medium text-white transition hover:opacity-80"
      >
        Products
      </RouterLink>
    </aside>

    <main class="flex-1 px-8 py-6">
      <RouterView />
    </main>
  </div>
</template>
