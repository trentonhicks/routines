<script lang="ts" setup>
import Habit from './types/Habit';
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from 'dexie';
import { database } from './data/database';
import { Disclosure } from '@headlessui/vue';
import Habits from './components/Habits.vue';
import AddHabitForm from './components/AddHabitForm.vue';

const navigation = [
  {
    name: 'Habits',
    href: '#',
    current: true
  }
];

const habits = useObservable<Habit[]>(liveQuery(async () => await database.habits.toArray()) as any);

const addHabit = async (name: string) => await database.habits.add({ name: name });

const removeHabit = async (id: number) => await database.habits.delete(id);
</script>

<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="border-b border-gray-200 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex flex-shrink-0 items-center">
              <img class="block h-8 w-auto lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
              <img class="hidden h-8 w-auto lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            </div>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.current
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                ]"
                :aria-current="item.current ? 'page' : undefined"
              >
                {{ item.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>

    <div class="py-10">
      <header>
        <AddHabitForm @submit="addHabit" />
      </header>
      <main>
        <div class="mx-auto max-w-7xl px-6 lg:px-8" v-if="habits">
          <Habits :items="habits" @remove-habit="removeHabit" />
        </div>
      </main>
    </div>
  </div>
</template>