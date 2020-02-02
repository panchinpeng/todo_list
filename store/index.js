export const state = () => ({
  // 待做事項
  todos: [],
  // 列表選擇(資料的ID)
  selectedItems: [],
  // 完成事項
  finishTodos: []
})

export const mutations = {
  addTodo(state, data) {
    state.todos = [...state.todos, data]
  },
  removeTodo(state, ids) {
    let tmpTodos = [...state.todos]
    if (!(ids instanceof Array)) {
      ids = [ids]
    }
    ids.forEach(id => {
      let removeIdx = tmpTodos.findIndex(item => item.id * 1 === id * 1)
      if (removeIdx === -1) {
        return
      }
      tmpTodos.splice(removeIdx, 1)
      state.todos = tmpTodos

      let willRemoveIdx = state.selectedItems.indexOf(id)
      if (willRemoveIdx > -1) {
        let tmpSelectItems = [...state.selectedItems]
        tmpSelectItems.splice(willRemoveIdx, 1)
        state.selectedItems = tmpSelectItems
      }
    })


  },
  addSelect(state, id) {
    let tmpItems = [...state.selectedItems, id]
    state.selectedItems = tmpItems
  },
  removeSelect(state, idx) {
    let tmpItems = [...state.selectedItems]
    tmpItems.splice(tmpItems.indexOf(idx), 1)
    state.selectedItems = tmpItems
  },
  resetSelected(state) {
    state.selectedItems = []
  },
  finishTodo(state) {
    let tmpFinish = state.todos.filter((item) => state.selectedItems.indexOf(item.id) > -1)
    tmpFinish.map(item => item.finishTime = Date.now())

    if (state.finishTodos.length > 0) {
      state.finishTodos = [...state.finishTodos, ...tmpFinish]
    } else {
      state.finishTodos = tmpFinish
    }

  },
  initTodos(state, data) {
    state.todos = JSON.parse(data)
  },
  initSelectedItems(state, data) {
    state.selectedItems = JSON.parse(data)
  },
  initFinishTodos(state, data) {
    state.finishTodos = JSON.parse(data)
  },
}

export const actions = {
  addTodo({
    commit
  }, data) {
    commit('addTodo', data)
  },
  removeTodo({
    commit
  }, id) {
    commit('removeTodo', id)
  },
  addSelect({
    commit
  }, idx) {
    commit('addSelect', idx)
  },
  removeSelect({
    commit
  }, idx) {
    commit('removeSelect', idx)
  },
  resetSelected({
    commit
  }) {
    commit('resetSelected')
  },
  finishTodo({
    commit,
    getters,
    state
  }) {
    if (getters.selectCount === 0) {
      return
    }

    commit('finishTodo')
    // 刪除待做事項
    commit('removeTodo', state.selectedItems)
    // 重設選重項目
    commit('resetSelected')
  },
  initTodos({
    commit
  }, data) {
    commit('initTodos', data)
  },
  initSelectedItems({
    commit
  }, data) {
    commit('initSelectedItems', data)
  },
  initFinishTodos({
    commit
  }, data) {
    commit('initFinishTodos', data)
  },

}

export const getters = {
  selectCount(state) {
    return state.selectedItems.length
  }
}
