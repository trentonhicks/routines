<script lang="ts" setup>
import Habit from '../types/Habit';
import { TrashIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits<{
  (event: 'remove-habit', id: number): void
}>();

const { items } = defineProps<{ items: Habit[] }>();
</script>

<template>
    <fieldset>
      <div class="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
        <div v-for="(item, index) in items" :key="index" class="relative flex items-start py-4">
            <div class="min-w-0 flex-1 text-lg leading-6">
              <label :for="`item-${item.id}`" class="select-none font-medium text-gray-900">{{ item.name }}</label>
            </div>
            <div class="ml-3 flex gap-5 h-6 items-start">
              <input
                  :id="`item-${item.id}`"
                  :name="`item-${item.id}`"
                  type="checkbox"
                  class="h-6 w-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <button @click="() => emit('remove-habit', item.id!)">
                <TrashIcon class="h-6 w-6 text-red-500" />
              </button>
            </div>
        </div>
      </div>
    </fieldset>
</template>