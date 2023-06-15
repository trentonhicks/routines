<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue';

const emit = defineEmits<{
    (event: 'submit', name: string): void
}>();

const name = ref<string>();

function onSubmit(event: Event) {
    event.preventDefault();
    
    if (name.value === undefined || name.value === '')
        return;

    emit('submit', name.value);

    name.value = '';
}
</script>

<template>
    <form
        class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        @submit="onSubmit"
    >
        <div class="flex gap-5 justify-between items-center">
        <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Habits</h1>
        <button
            type="submit" 
            class="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            <PlusIcon class="h-5 w-5" aria-hidden="true" />
        </button>
        </div>
        <div class="mt-3">
        <label
            for="task"
            class="sr-only">
            Habit Name
        </label>
        <input
            id="task"
            class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter habit name..."
            v-model="name"
        />
        </div>
    </form>
</template>