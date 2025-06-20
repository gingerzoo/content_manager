import { defineStore } from 'pinia';

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

interface RootState {
  name: string;
  age: number;
}

const useMainStore = defineStore('counter', {
  state: (): RootState => ({
    name: 'zlx',
    age: 18
  }),
  // getters类似computed
  getters: {
    // doubleAge: (state) => state.age*2
    doubleAge(state) {
      return state.age * 2;
    }
  },
  actions: {
    changeNameAction(newName: string) {
      this.name = newName;
    }
  }
});

export default useMainStore;
