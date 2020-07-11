export const makeType = x =>
	(a, isAsync) => {
		if (isAsync) {
			return {
				START: `${x}/${a}--start`,
				SUCCESS: `${x}/${a}--success`,
				ERROR: `${x}/${a}--error`
			}
		}
		return `${x}/${a}`
	}

export const mac = (type, ...argNames) =>
	(...args) => {
		const action = { type }
		argNames.forEach((arg, index) => {
			action[argNames[index]] = args[index]
		})
		return action
	}

export const asyncMac = type => ({
	error: mac(`${type.ERROR}`, 'error'),
	start: mac(`${type.START}`),
	success: mac(`${type.SUCCESS}`, 'payload')
})

export const createReducer = (initialState, actionHandlers) =>
	(state = initialState, action) => {
		if (actionHandlers.hasOwnProperty(action.type)) {
			const newState = actionHandlers[action.type](state, action)
			if (newState !== state)
				return newState
		}
		return state
	}

export const reduceReducers = (...reducers) =>
	(prevState, value, ...args) =>
		reducers.reduce(
			(newState, reducer) => reducer(newState, value, ...args),
			prevState
		)